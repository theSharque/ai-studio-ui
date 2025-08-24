import { Component, input, output, inject } from '@angular/core';
import { PhotoFilm } from '../photo-film/photo-film'; // Исправлен путь

@Component({
  selector: 'app-frame',
  standalone: true,
  templateUrl: './frame.html',
  styleUrls: ['./frame.css']
})
export class Frame {
  id = input.required<number>();
  isActive = input(false);
  selected = output<number>();
  photoFilm = inject(PhotoFilm);

  onClick() {
    this.selected.emit(this.id());
  }

  deleteFrame(event: Event) {
    event.stopPropagation();
    if (confirm('Delete this frame?')) {
      this.photoFilm.deleteFrame(this.id());
    }
  }
}
