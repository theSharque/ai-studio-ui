import {Component, signal} from '@angular/core';
import {Controls} from './controls/controls';
import {Preview} from './preview/preview';
import {PhotoFilm} from './photo-film/photo-film';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Controls, Preview, PhotoFilm],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  project = signal({
    name: 'MyFirstMovie',
    size: '480x320',
    frames: 160,
    fps: 16,
    time: '00:10',
    interpolate: 1
  });
}
