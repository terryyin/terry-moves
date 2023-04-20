import { ScaleToUpperRightAction } from './Subtitles';
import { CSSProperties } from 'react';
import { Action, Subtitle } from '@/models/Subtitles';
import AnimationContextWrapper from './AnimationContextWrapper';


export default class Actioner {
  subtitle: Subtitle | undefined;
  action: Action | undefined;
  animationContextWrapper: AnimationContextWrapper;


  constructor(subtitle: Subtitle | undefined, action: Action | undefined, animationContextWrapper: AnimationContextWrapper) {
    this.subtitle = subtitle;
    this.action = action;
    this.animationContextWrapper = animationContextWrapper;
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
        throw new Error('Unknown action type');
    }
  }

  getScaleToUpperRightStyle(action: ScaleToUpperRightAction): CSSProperties {
    const scale = this.getScale(action.outputRange);
    return {
      left: `${100 - scale}%`, top:'0%', width: `${scale}%`, height: `${scale}%`
    }
  }

  getAppearStyle(range: number[]): CSSProperties {
    const scale = this.getScale(range);
    return {
      opacity: scale,
    }
  }

  getScale(outputRange: number[]): number {
    if(!this.subtitle?.actions) return 100;
    if(!this.action) return 100;
    return this.animationContextWrapper.interpolate1(this.animationContextWrapper.getStartTimeOfSubtitle(this.subtitle.id), this.action.duration, outputRange);
  }
}