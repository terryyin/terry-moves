import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';
import LazyStyle from './LazyStyle';

export default abstract class DivBaseActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  combine(prev: LazyStyle): LazyStyle {
    return this.getStyle().combine(prev);
  }

  protected abstract getStyle(): LazyStyle;
}