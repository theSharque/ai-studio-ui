export interface PluginParam {
  name: string;
  type: 'list' | 'string' | 'number' | 'boolean';
  default?: string | number | boolean;
  listValues?: string[];
}

export interface PluginAction {
  name: string;
  api: string;
  params: PluginParam[];
}
