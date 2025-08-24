import { Injectable, signal } from '@angular/core';
import { PluginAction } from '../models/plugin.model';

@Injectable({ providedIn: 'root' })
export class PluginService {
  plugins = signal<PluginAction[]>([]);

  loadPlugins() {
    setTimeout(() => {
      this.plugins.set([
        {
          name: 'Delete Frame',
          api: '/api/delete',
          params: []
        },
        {
          name: 'Generate Frame',
          api: '/api/sdxl',
          params: [
            {
              name: 'Model Name',
              type: 'list',
              default: 'sd-xl-base-1.0',
              listValues: ['sd-xl-base-1.0', 'stable-diffusion-2.1', 'custom-model']
            },
            {
              name: 'Step Count',
              type: 'number',
              default: 30
            },
            {
              name: 'CFG Scale',
              type: 'number',
              default: 3
            },
            {
              name: 'Positive Prompt',
              type: 'string',
              default: ''
            },
            {
              name: 'Negative Prompt',
              type: 'string',
              default: 'bad quality, blurry'
            }
          ]
        }
      ]);
    }, 100);
  }
}
