import { Component, input, output, inject } from '@angular/core';
import { BackendService } from '../shared/services/backend.service';
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
  projectName = input.required<string>();
  fps = input(16);
  selected = output<number>();

  backend = inject(BackendService);

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

  get imageUrl(): string {
    return this.frame().img
      ? this.frame().img
      : this.backend.getFrameImageUrl(this.projectName(), this.frame().id);
  }

  get generatedUrl(): string {
    return this.frame().generated
      ? this.frame().generated
      : this.backend.getGeneratedImageUrl(this.projectName(), this.frame().id);
  }
}
