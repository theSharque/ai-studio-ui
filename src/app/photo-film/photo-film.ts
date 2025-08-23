import { Component, signal, inject } from '@angular/core';
import { App } from '../app';
import { Frame } from '../frame/frame';

@Component({
  selector: 'app-photo-film',
  standalone: true,
  imports: [Frame],
  templateUrl: './photo-film.html',
  styleUrls: ['./photo-film.css']
})
export class PhotoFilm {
  frames = signal(
    Array.from({ length: 28 }, (_, i) => ({
      number: i + 1,
      active: i === 2
    }))
  );

  selectFrame(number: number) {
    this.frames.update(frames =>
      frames.map(frame => ({
        ...frame,
        active: frame.number === number
      }))
    );
  }

  addFrame() {
    const currentFrames = this.frames();
    const newFrame = {
      number: currentFrames.length + 1,
      active: true
    };

    this.frames.update(frames => [
      ...frames,
      newFrame
    ]);

    // ИСПРАВЛЕНО: правильно используем сигналы
    const app = inject(App);
    const currentProject = app.project(); // Получаем текущее значение

    app.project.update(p => ({
      ...p,
      frames: p.frames + 1,
      time: this.calculateTime(p.frames + 1, p.fps)
    }));
  }

  private calculateTime(frames: number, fps: number): string {
    const seconds = frames / fps;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
