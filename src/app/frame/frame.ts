import { Component, input, output } from '@angular/core'; // Убран inject из импортов
import { FrameData } from '../shared/models/frame.model';

@Component({
  selector: 'app-frame',
  standalone: true,
  templateUrl: './frame.html',
  styleUrls: ['./frame.css']
})
export class Frame {
  frame = input.required<FrameData>();
  isActive = input(false);
  fps = input(16);
  selected = output<number>();

  onClick() {
    this.selected.emit(this.frame().id);
  }

  get time(): string {
    const timeMs = (this.frame().id - 1) * (1000 / this.fps());
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    const milliseconds = timeMs % 1000;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  }
}
