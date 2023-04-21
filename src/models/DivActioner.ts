import { ScaleToUpperRightAction } from './Subtitles';
import { CSSProperties } from 'react';
import { Action } from '@/models/Subtitles';
import Actioner from './Actioner';

export default class DivActioner extends Actioner {
  action: Action;

  constructor(action: Action, startTime: number, frame: number, fps: number) {
    super(action, startTime, frame, fps);
    this.action = action;
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

  private getScaleToUpperRightStyle(action: ScaleToUpperRightAction): CSSProperties {
    const scale = this.interpolateDuration(action.outputRange);
    return {
      left: `${100 - scale}%`, top:'0%', width: `${scale}%`, height: `${scale}%`
    }
  }
}