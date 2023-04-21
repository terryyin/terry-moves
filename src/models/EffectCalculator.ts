import {interpolate} from 'remotion'
import {spring} from 'remotion'
import { BaseAction } from './Subtitles';
import { CSSProperties } from 'react';

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

  get endFrame(): number {
    return this.startFrame + this.action.duration * this.fps;
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

  getAppearStyle(range: number[]): CSSProperties {
    const scale = this.interpolateDuration(range);
    return {
      opacity: scale,
    }
  }

  interpolateSpring(outputRange: number[]): number {
    return interpolate(this.getSpring(), [0, 1], outputRange);
  }

  interpolateDuration(outputRange: number[]): number {
    return interpolate(this.frame, [this.startFrame, this.endFrame], outputRange, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }
}