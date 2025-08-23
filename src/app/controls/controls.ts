import { Component } from '@angular/core';
import { Project } from '../project/project';
import { Action } from '../action/action';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [Project, Action],
  templateUrl: './controls.html',
  styleUrls: ['./controls.css']
})
export class Controls {}
