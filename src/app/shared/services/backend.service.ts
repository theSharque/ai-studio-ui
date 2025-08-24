import {Injectable, signal, computed} from '@angular/core';
import {AppConfig} from '../../app.config'; // Используем существующий файл
import {ProjectData} from '../models/project.model';
import {PluginAction} from '../models/plugin.model';

@Injectable({providedIn: 'root'})
export class BackendService {
  // Сигналы для хранения данных
  projects = signal<ProjectData[]>([]);
  currentProject = signal<ProjectData | null>(null);
  plugins = signal<PluginAction[]>([]);

  // Вычисляемые свойства
  frames = computed(() => this.currentProject()?.frames || []);
  activeFrame = computed(() => {
    const project = this.currentProject();
    if (!project) return null;

    return project.frames.find(f => f.id === project.activeFrameId) || null;
  });

  // Состояние загрузки
  isLoading = signal(false);
  error = signal<string | null>(null);

  // Используем конфигурацию из app.config.ts
  private readonly API_BASE_URL = AppConfig.apiBaseUrl;
  private readonly STATIC_BASE_URL = AppConfig.staticBaseUrl;

  // Загрузка всех данных при старте
  async init() {
    this.isLoading.set(true);
    try {
      await Promise.all([
        this.loadProjects(),
        this.loadPlugins()
      ]);

      // Автоматически загружаем первый проект
      if (this.projects().length > 0) {
        await this.loadProject(this.projects()[0].name);
      }
    } catch (err) {
      this.handleError(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  // Загрузка списка проектов
  async loadProjects() {
    try {
      const response = await fetch(`${this.API_BASE_URL}/projects`);
      if (!response.ok) throw new Error('Failed to load projects');

      const projects = await response.json();
      this.projects.set(projects);
    } catch (err) {
      this.handleError(err);
      throw err;
    }
  }

  // Загрузка конкретного проекта
  async loadProject(projectName: string) {
    try {
      this.isLoading.set(true);
      const response = await fetch(`${this.API_BASE_URL}/projects/${projectName}`);
      if (!response.ok) throw new Error('Project not found');

      const project = await response.json();
      this.currentProject.set(project);
    } catch (err) {
      this.handleError(err);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Загрузка списка плагинов
  async loadPlugins() {
    try {
      const response = await fetch(`${this.API_BASE_URL}/plugins`);
      if (!response.ok) throw new Error('Failed to load plugins');

      const plugins = await response.json();
      this.plugins.set(plugins);
    } catch (err) {
      this.handleError(err);
      throw err;
    }
  }

  // Получение URL изображения кадра
  getFrameImageUrl(projectName: string, frameId: number): string {
    return `${this.STATIC_BASE_URL}/projects/${projectName}/frames/frame${frameId}.png`;
  }

  // Получение URL сгенерированного изображения
  getGeneratedImageUrl(projectName: string, frameId: number): string {
    return `${this.STATIC_BASE_URL}/generated/${projectName}/frame${frameId}.png`;
  }

  // Выполнение плагина
  async executePlugin(pluginName: string, params: Record<string, any>) {
    try {
      this.isLoading.set(true);
      const response = await fetch(`${this.API_BASE_URL}/plugins/${pluginName}/execute`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Plugin execution failed');
      }

      const result = await response.json();

      // Если плагин генерирует изображение, обновляем текущий проект
      if (result.result?.image_url) {
        this.updateCurrentProjectWithGeneratedFrame(
          result.result.image_url,
          params['frame_id']
        );
      }

      return result;
    } catch (err) {
      this.handleError(err);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Вспомогательный метод для обновления кадра
  private updateCurrentProjectWithGeneratedFrame(imageUrl: string, frameId: number) {
    this.currentProject.update(project => {
      if (!project) return project;

      return {
        ...project,
        frames: project.frames.map(frame =>
          frame.id === frameId
            ? {...frame, generated: imageUrl}
            : frame
        )
      };
    });
  }

  // Обработка ошибок
  private handleError(error: any) {
    console.error('Backend error:', error);
    this.error.set(error.message || 'An unexpected error occurred');

    // Очистка ошибки через 5 секунд
    setTimeout(() => {
      if (this.error() === error.message) {
        this.error.set(null);
      }
    }, 5000);
  }
}
