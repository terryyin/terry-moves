import {interpolate} from 'remotion'
import {spring} from 'remotion'
import { BaseAction } from './Subtitles';

export type EffectCalculatorAndAction = {
  action: BaseAction;
  effectCalculator: EffectCalculator;
}

export default class EffectCalculator {
  durationInFrames: number;
  startFrame: number;
  frame: number;
  fps: number;


  constructor(duration: number, startTime: number, frame: number, fps: number) {
    this.startFrame = startTime * fps;
    this.frame = frame;
    this.fps = fps;
    this.durationInFrames = duration * fps;
  }

  get endFrame(): number {
    return this.startFrame + this.durationInFrames;
  }

  get frameRange(): [number, number] {
    return [this.startFrame, this.endFrame];
  }

  timeWithIn(): number {
    return Math.min(this.durationInFrames / this.fps, Math.max(0, (this.frame - this.startFrame) / this.fps));
  }

  isAfter(): boolean {
    return this.frame > this.endFrame;
  }

  withInDuration(): boolean {
    return this.frame >= this.startFrame && !this.isAfter();
  }

  getSpring() {
    return spring({
      frame: this.frame - this.startFrame,
      fps: this.fps,
      durationInFrames: this.durationInFrames,
      config: {
        damping: 50,
        mass: 0.5,
        stiffness: 200,
        overshootClamping: true,
      },
    });
  }

  interpolateSpring(outputRange: number[]): number {
    return interpolate(this.getSpring(), [0, 1], outputRange);
  }

  interpolateDuration(outputRange: number[]): number {
    return interpolate(this.frame, this.frameRange, outputRange, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }
}