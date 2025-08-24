import { Injectable, signal } from '@angular/core';
import { PluginAction } from '../models/plugin.model';

@Injectable({ providedIn: 'root' })
export class PluginService {
  plugins = signal<PluginAction[]>([]);

  loadPlugins() {
    fetch('/api/plugins')
    .then(response => response.json())
    .then(plugins => this.plugins.set(plugins));
  }
}
