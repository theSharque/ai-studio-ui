import { Component, inject } from '@angular/core';
import { App } from '../app';

@Component({
  selector: 'app-action',
  standalone: true,
  templateUrl: './action.html',
  styleUrls: ['./action.css']
})
export class Action {
  app = inject(App);

  addFrame() {
    // ИСПРАВЛЕНО: правильно используем сигналы
    const current = this.app.project();
    this.app.project.update(p => ({
      ...p,
      frames: p.frames + 1,
      time: this.calculateTime(p.frames + 1, p.fps)
    }));
  }

  exportProject() {
    console.log('Exporting project:', this.app.project());
  }

  private calculateTime(frames: number, fps: number): string {
    const seconds = frames / fps;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
