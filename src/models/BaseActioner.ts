import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';
import LazyTransitions from './LazyTransitions';

export default abstract class BaseActioner {
  action: Action;
  frameRange: [number, number];

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.frameRange = effectCalculator.frameRange;
    this.action = action;
  }

  combine(prev: LazyTransitions): LazyTransitions {
    return this.getStyle().combine(prev);
  }

  protected abstract getStyle(): LazyTransitions;
}