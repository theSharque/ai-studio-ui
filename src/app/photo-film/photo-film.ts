import { Component, inject } from '@angular/core';
import { App } from '../app'; // Исправлен путь
import { Frame } from '../frame/frame';
import { FrameData } from '../shared/models/frame.model'; // Исправлен путь

@Component({
  selector: 'app-photo-film',
  standalone: true,
  imports: [Frame],
  templateUrl: './photo-film.html',
  styleUrls: ['./photo-film.css']
})
export class PhotoFilm {
  app = inject(App);

  selectFrame(id: number) {
    this.app.project.update(p => ({
      ...p,
      activeFrameId: id
    }));
  }

  addFrame() {
    const current = this.app.project();
    const newId = current.frameCount + 1;

    const newFrame: FrameData = {
      id: newId,
      img: '',
      generated: '',
      separate: false
    };

    this.app.project.update(p => ({
      ...p,
      frameCount: p.frameCount + 1,
      frames: [...p.frames, newFrame],
      activeFrameId: newId
    }));
  }
}
