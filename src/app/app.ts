import { Component, signal, computed } from '@angular/core';
import { ProjectData } from './shared/models/project.model'; // Исправлен путь
import { Controls } from './controls/controls';
import { Preview } from './preview/preview';
import { PhotoFilm } from './photo-film/photo-film';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Controls, Preview, PhotoFilm],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  project = signal<ProjectData>({
    name: 'MyFirstMovie',
    size: '480x320',
    frameCount: 160,
    fps: 16,
    activeFrameId: 3,
    frames: Array.from({ length: 160 }, (_, i) => ({
      id: i + 1,
      img: '',
      generated: '',
      separate: false
    }))
  });

  duration = computed(() => {
    const p = this.project();
    return this.calculateTime(p.frameCount, p.fps);
  });

  private calculateTime(frames: number, fps: number): string {
    const seconds = frames / fps;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
