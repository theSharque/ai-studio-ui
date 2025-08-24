import { Component, input, output } from '@angular/core';

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

  onClick() {
    this.selected.emit(this.id());
  }
}
