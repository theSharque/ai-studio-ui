import { Component, inject, signal } from '@angular/core';
import { App } from '../app';
import { BackendService } from '../shared/services/backend.service';

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.html',
  styleUrls: ['./project.css']
})
export class Project {
  app = inject(App);
  backend = inject(BackendService);

  // Сигналы для модального окна создания проекта
  isCreatingProject = signal(false);
  newProjectName = signal('');

  openCreateProjectModal() {
    this.isCreatingProject.set(true);
  }

  closeCreateProjectModal() {
    this.isCreatingProject.set(false);
    this.newProjectName.set('');
  }

  async createProject() {
    const name = this.newProjectName().trim();
    if (!name) {
      alert('Project name is required');
      return;
    }

    try {
      await this.backend.createProject(name);
      this.closeCreateProjectModal();
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Error creating project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }
}
