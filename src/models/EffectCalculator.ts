import {interpolate} from 'remotion'
import {spring} from 'remotion'
import { BaseAction } from './Subtitles';

export type EffectCalculatorAndAction = {
  action: BaseAction;
  effectCalculator: EffectCalculator;
}

export default class EffectCalculator {
  persistStartFrame: number;
  frame: number;
  fps: number;
  PersisitDuration: number;
  startDuration: number;
  endDuration: number;


  // eslint-disable-next-line max-params
  constructor(duration: number, startTime: number, startDuration: number, endDuration: number, frame: number, fps: number) {
    this.startDuration = startDuration;
    this.endDuration = endDuration;
    this.persistStartFrame = (startTime + startDuration) * fps;
    this.frame = frame;
    this.fps = fps;
    this.PersisitDuration = duration - startDuration - endDuration;
    if(this.persistStartFrame < 0) {
      throw new Error('persistStartFrame < 0');
    }
  }

  get durationInFrames(): number {
    return this.PersisitDuration * this.fps;
  }

  get endFrame(): number {
    return this.persistStartFrame + this.durationInFrames + (this.startDuration) * this.fps;
  }

  get frameRange(): [number, number] {
    return [this.persistStartFrame, this.endFrame];
  }

  timeWithIn(): number {
    return Math.min(this.durationInFrames / this.fps, Math.max(0, (this.frame - this.persistStartFrame) / this.fps));
  }

  isAfter(): boolean {
    return this.frame > this.endFrame;
  }

  isBefore(): boolean {
    return this.frame < this.persistStartFrame;
  }

  withInDuration(): boolean {
    return this.frame >= this.persistStartFrame && !this.isAfter();
  }

  withInStartDuration(ratio: number): boolean {
    return this.frame < this.persistStartFrame && this.frame >= (this.persistStartFrame - this.startDuration * ratio * this.fps); 
  }

  withInEndDuration(ratio: number): boolean {
    return this.frame > this.endFrame && this.frame >= (this.endFrame + this.endDuration * ratio * this.fps); 
  }

  blink(timeIntervalShow: number, timeIntervalHide: number): boolean {
    return this.frame / this.fps % (timeIntervalShow + timeIntervalHide) < timeIntervalShow;
  }

  private getSpring() {
    return spring({
      frame: this.frame - this.persistStartFrame,
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