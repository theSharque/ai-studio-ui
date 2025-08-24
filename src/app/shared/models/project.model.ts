import {FrameData} from './frame.model';

export interface ProjectData {
  name: string;
  size: string;
  frameCount: number;
  fps: number;
  activeFrameId: number;
  duration: number;
  frames: FrameData[];
}
