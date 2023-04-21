import { ScaleToUpperRightAction } from './Subtitles';
import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';
import LazyStyle from './LazyStyle';

export default class DivActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  static defaultValue: LazyStyle = new LazyStyle({})

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  combine(prev: LazyStyle): LazyStyle {
    return this.getStyle().combine(prev);
  }

  private getStyle(): LazyStyle {
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

  getAppearStyle(range: number[]): LazyStyle {
    const result = new LazyStyle({});
    result.setOpacityInterpolation(this.effectCalculator.frameRange, range);
    return result;
  }

  private getScaleToUpperRightStyle(action: ScaleToUpperRightAction): LazyStyle {
    const scale = this.effectCalculator.interpolateDuration(action.outputRange);
    return new LazyStyle({
      left: `${100 - scale}%`, top:'0%', width: `${scale}%`, height: `${scale}%`
    })
  }
}