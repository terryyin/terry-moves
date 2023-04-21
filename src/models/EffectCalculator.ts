import {interpolate} from 'remotion'
import {spring} from 'remotion'
import { BaseAction } from './Subtitles';

export default class EffectCalculator {
  action: BaseAction;
  startFrame: number;
  frame: number;
  fps: number;


  constructor(action: BaseAction, startTime: number, frame: number, fps: number) {
    this.action = action;
    this.startFrame = startTime * fps;
    this.frame = frame;
    this.fps = fps;
  }

  get durationInFrames(): number {
    return this.action.duration * this.fps;
  }

  get endFrame(): number {
    return this.startFrame + this.durationInFrames;
  }

  get frameRange(): [number, number] {
    return [this.startFrame, this.endFrame];
  }

  getSpring(): number {
    return spring({
      frame: this.frame - this.startFrame,
      fps: this.fps,
      config: {
        damping: 200,
        mass: 3,
      },
    });
  }

  getSpring1() {
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