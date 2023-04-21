import {interpolate} from 'remotion'
import {spring} from 'remotion'
import { ScaleToUpperRightAction } from './Subtitles';
import { CSSProperties } from 'react';
import { Action } from '@/models/Subtitles';

export default class Actioner {
  action: Action;
  startFrame: number;
  frame: number;
  fps: number;


  constructor(action: Action, startTime: number, frame: number, fps: number) {
    this.action = action;
    this.startFrame = startTime * fps;
    this.frame = frame;
    this.fps = fps;
  }

  private get endFrame(): number {
    return this.startFrame + this.action.duration * this.fps;
  }

  getStyle(): CSSProperties {
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
    switch(this.action.action) {
      case '3d rise':
        return this.interpolateSpring([-4, 0]);
      default:
        return 0;
    }
  }

  getThreeRotateY(): number {
    switch(this.action.action) {
      case '3d rise':
        return this.interpolateSpring([-Math.PI * 2, 0]);
      case '3d rotate':
        return this.interpolateDuration([0, Math.PI * this.action.duration]);
      default:
        return 0;
    }
  }

  getThreeScale(): number {
    switch(this.action.action) {
      case '3d rise':
        return this.getSpring();
      default:
        return 1;
    }
  }

  private getSpring(): number {
    return spring({
      frame: this.frame - this.startFrame,
      fps: this.fps,
      config: {
        damping: 200,
        mass: 3,
      },
    });
  }

  private getScaleToUpperRightStyle(action: ScaleToUpperRightAction): CSSProperties {
    const scale = this.interpolateDuration(action.outputRange);
    return {
      left: `${100 - scale}%`, top:'0%', width: `${scale}%`, height: `${scale}%`
    }
  }

  private getAppearStyle(range: number[]): CSSProperties {
    const scale = this.interpolateDuration(range);
    return {
      opacity: scale,
    }
  }

  private interpolateSpring(outputRange: number[]): number {
    return interpolate(this.getSpring(), [0, 1], outputRange);
  }

  private interpolateDuration(outputRange: number[]): number {
    return interpolate(this.frame, [this.startFrame, this.endFrame], outputRange, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

}