import { Component, inject, signal } from '@angular/core';
import { BackendService } from '../shared/services/backend.service';
import { PluginAction } from '../shared/models/plugin.model';
import { App } from '../app';

@Component({
  selector: 'app-action',
  standalone: true,
  templateUrl: './action.html',
  styleUrls: ['./action.css']
})
export class Action {
  app = inject(App);
  backend = inject(BackendService);
  selectedPlugin = signal<PluginAction | null>(null);
  formData = signal<Record<string, any>>({});

  executePlugin(plugin: PluginAction) {
    if (plugin.params.length === 0) {
      this.confirmAction(plugin);
    } else {
      this.selectedPlugin.set(plugin);
      this.resetFormData(plugin);
    }
  }

  confirmAction(plugin: PluginAction) {
    if (confirm(`Execute ${plugin.name}?`)) {
      const project = this.app.project();
      const params = {
        ...this.formData(),
        project_name: project.name,
        ['frame_id']: project.activeFrameId
      };

      this.backend.executePlugin(plugin.name, params)
      .then(() => console.log('Plugin executed successfully'))
      .catch(error => alert(`Error: ${error.message}`));
    }
  }

  resetFormData(plugin: PluginAction) {
    const initialData: Record<string, any> = {};
    plugin.params.forEach(param => {
      initialData[param.name] = param.default;
    });
    this.formData.set(initialData);
  }

  updateFormData(paramName: string, value: any) {
    this.formData.update(data => ({
      ...data,
      [paramName]: value.value
    }));
  }

  cancelPlugin() {
    this.selectedPlugin.set(null);
  }
}
