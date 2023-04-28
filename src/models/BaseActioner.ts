import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';
import LazyTransitions from './LazyTransitions';

export default abstract class BaseActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  combine(prev: LazyTransitions): LazyTransitions {
    return this.getStyle().combine(prev);
  }

  protected abstract getStyle(): LazyTransitions;
}