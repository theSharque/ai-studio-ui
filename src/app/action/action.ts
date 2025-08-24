import { Component, inject, signal } from '@angular/core';
import { PluginService } from '../shared/services/plugin.service';
import { PluginAction, PluginParam } from '../shared/models/plugin.model';
import { App } from '../app';

@Component({
  selector: 'app-action',
  standalone: true,
  templateUrl: './action.html',
  styleUrls: ['./action.css']
})
export class Action {
  app = inject(App);
  pluginService = inject(PluginService);
  selectedPlugin = signal<PluginAction | null>(null);
  formData = signal<Record<string, any>>({});

  constructor() {
    this.pluginService.loadPlugins();
  }

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
      this.sendRequest(plugin, this.formData());
    }
  }

  sendRequest(plugin: PluginAction, data: Record<string, any>) {
    console.log(`Sending to ${plugin.api}`, {
      ...data,
      activeFrameId: this.app.project().activeFrameId
    });

    this.selectedPlugin.set(null);
  }

  resetFormData(plugin: PluginAction) {
    const initialData: Record<string, any> = {};
    plugin.params.forEach(param => {
      initialData[param.name] = param.default;
    });
    this.formData.set(initialData);
  }

  // УЛУЧШЕНО: Правильная типизация для обработки ввода
  updateFormData(paramName: string, element: EventTarget | null) {
    if (!element) return;

    // Проверяем, что элемент является HTMLInputElement или HTMLSelectElement
    if ('value' in element) {
      this.formData.update(data => ({
        ...data,
        [paramName]: (element as HTMLInputElement | HTMLSelectElement).value
      }));
    }
  }

  cancelPlugin() {
    this.selectedPlugin.set(null);
  }
}
