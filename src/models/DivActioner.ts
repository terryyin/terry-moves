import { ScaleToUpperRightAction } from './Subtitles';
import { CSSProperties } from 'react';
import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';

export default class DivActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  getStyle(): CSSProperties {
    switch(this.action.action) {
      case 'scaleToUpperRight':
        return this.getScaleToUpperRightStyle(this.action);
      case 'appear':
        return this.effectCalculator.getAppearStyle([0, 1]);
      case 'disappear':
        return this.effectCalculator.getAppearStyle([1, 0]);
      default:
        throw new Error(`Unknown action type for div ${this.action.action}`);
    }
  }

  private getScaleToUpperRightStyle(action: ScaleToUpperRightAction): CSSProperties {
    const scale = this.effectCalculator.interpolateDuration(action.outputRange);
    return {
      left: `${100 - scale}%`, top:'0%', width: `${scale}%`, height: `${scale}%`
    }
  }
}