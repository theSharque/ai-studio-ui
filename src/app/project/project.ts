import { Component, inject } from '@angular/core';
import { App } from '../app';

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.html',
  styleUrls: ['./project.css']
})
export class Project {
  app = inject(App);
}
