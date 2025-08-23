import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-frame',
  standalone: true,
  templateUrl: './frame.html',
  styleUrls: ['./frame.css']
})
export class Frame {
  number = input.required<number>();
  active = input(false);
  clicked = output<number>();

  onClick() {
    this.clicked.emit(this.number());
  }
}
