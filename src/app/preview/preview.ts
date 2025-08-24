import { Component, inject, signal } from '@angular/core';
import { App } from '../app';
import { FrameData } from '../shared/models/frame.model';

@Component({
  selector: 'app-preview',
  standalone: true,
  templateUrl: './preview.html',
  styleUrls: ['./preview.css']
})
export class Preview {
  app = inject(App);
  isPlaying = signal(false);

  get currentFrame(): FrameData | undefined {
    return this.app.project().frames.find(
      frame => frame.id === this.app.project().activeFrameId
    );
  }

  goToStart() {
    this.app.project.update(p => ({ ...p, activeFrameId: 1 }));
  }

  prevFrame() {
    const current = this.app.project();
    const prevId = Math.max(1, current.activeFrameId - 1);
    this.app.project.update(p => ({ ...p, activeFrameId: prevId }));
  }

  togglePlay() {
    this.isPlaying.update(v => !v);
    if (this.isPlaying()) {
      this.playAnimation();
    }
  }

  nextFrame() {
    const current = this.app.project();
    const nextId = Math.min(current.frameCount, current.activeFrameId + 1);
    this.app.project.update(p => ({ ...p, activeFrameId: nextId }));
  }

  goToEnd() {
    const frameCount = this.app.project().frameCount;
    this.app.project.update(p => ({ ...p, activeFrameId: frameCount }));
  }

  private playAnimation() {
    const interval = 1000 / this.app.project().fps;
    const timer = setInterval(() => {
      if (!this.isPlaying()) {
        clearInterval(timer);
        return;
      }

      this.nextFrame();
      if (this.app.project().activeFrameId === this.app.project().frameCount) {
        this.isPlaying.set(false);
        clearInterval(timer);
      }
    }, interval);
  }
}
