import { FrameData } from './frame.model';

export interface ProjectData {
  name: string;
  size: string;
  frameCount: number;
  fps: number;
  frames: FrameData[];
  activeFrameId: number;
}
