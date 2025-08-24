import { Component, inject, signal, computed } from '@angular/core';
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
  imageLoaded = signal(false);

  get currentFrame(): FrameData | undefined {
    return this.app.project().frames.find(
      frame => frame.id === this.app.project().activeFrameId
    );
  }

  isFrameReady = computed(() => {
    const frame = this.currentFrame;
    return !!frame && (frame.img !== '' || frame.generated !== '');
  });

  isImageLoaded = computed(() => {
    return this.imageLoaded() && this.isFrameReady();
  });

  onImageLoad() {
    this.imageLoaded.set(true);
  }

  onImageError() {
    this.imageLoaded.set(false);
  }

  goToStart() {
    const current = this.app.project();
    this.app.project.set({ ...current, activeFrameId: 1 });
  }

  prevFrame() {
    const current = this.app.project();
    const prevId = Math.max(1, current.activeFrameId - 1);
    this.app.project.set({ ...current, activeFrameId: prevId });
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
    this.app.project.set({ ...current, activeFrameId: nextId });
  }

  goToEnd() {
    const current = this.app.project();
    this.app.project.set({ ...current, activeFrameId: current.frameCount });
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
