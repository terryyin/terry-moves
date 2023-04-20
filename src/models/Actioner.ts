import {interpolate} from 'remotion'
import {spring} from 'remotion'
import { ScaleToUpperRightAction } from './Subtitles';
import { CSSProperties } from 'react';
import { Action } from '@/models/Subtitles';

export default class Actioner {
  action: Action | undefined;
  startTime: number;
  frame: number;
  fps: number;


  constructor(action: Action | undefined, startTime: number, frame: number, fps: number) {
    this.action = action;
    this.startTime = startTime;
    this.frame = frame;
    this.fps = fps;
  }

  getStyle(): CSSProperties {
    if(!this.action) return {};
    switch(this.action.action) {
      case 'scaleToUpperRight':
        return this.getScaleToUpperRightStyle(this.action);
      case 'appear':
        return this.getAppearStyle([0, 1]);
      case 'disappear':
        return this.getAppearStyle([1, 0]);
      default:
        throw new Error(`Unknown action type for div ${this.action.action}`);
    }
  }

  getThreeTranslateY(): number {
    if(!this.action) return 0;
    const entranceAnimation = this.getThreeScale();
    return interpolate(entranceAnimation, [0, 1], [-4, 0]);
  }

  getThreeScale(): number {
    if(!this.action) return 0;
    return spring({
      frame: this.frame - this.startTime * this.fps,
      fps: this.fps,
      config: {
        damping: 200,
        mass: 3,
      },
    });
  }

  private getScaleToUpperRightStyle(action: ScaleToUpperRightAction): CSSProperties {
    const scale = this.getScale(action.outputRange);
    return {
      left: `${100 - scale}%`, top:'0%', width: `${scale}%`, height: `${scale}%`
    }
  }

  private getAppearStyle(range: number[]): CSSProperties {
    const scale = this.getScale(range);
    return {
      opacity: scale,
    }
  }

  private getScale(outputRange: number[]): number {
    if(!this.action) return 100;
    return this.interpolate1(this.action.duration, outputRange);
  }
  
  private interpolate1(durationInSeconds: number, outputRange: number[]): number {
    return interpolate(this.frame, [this.startTime * this.fps, (this.startTime + durationInSeconds) * this.fps], outputRange, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

}