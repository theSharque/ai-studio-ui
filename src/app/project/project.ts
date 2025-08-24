import { Component, inject } from '@angular/core';
import { App } from '../app'; // Исправлен путь
import { ProjectData } from '../shared/models/project.model'; // Исправлен путь

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.html',
  styleUrls: ['./project.css']
})
export class Project {
  app = inject(App);
}
