import { Component, inject } from '@angular/core';
import { App } from '../app'; // Исправлен путь

@Component({
  selector: 'app-action',
  standalone: true,
  templateUrl: './action.html',
  styleUrls: ['./action.css']
})
export class Action {
  app = inject(App);

  addFrame() {
    const photoFilm = document.querySelector('app-photo-film') as any;
    photoFilm?.addFrame();
  }

  exportProject() {
    console.log('Exporting project:', this.app.project());
  }
}
