import { EffectCalculatorAndAction } from './EffectCalculator';
import { Action } from '@/models/Subtitles';

interface Combinable<T> {
  combine(prev: T): T;
}

export default abstract class BaseActioner<T extends Combinable<T>> {
  action: Action;
  frameRange: [number, number];

  constructor(effectCalculator: EffectCalculatorAndAction) {
    this.frameRange = effectCalculator.effectCalculator.frameRange;
    this.action = effectCalculator.action;
  }

  combine(prev: T): T {
    return this.getStyle().combine(prev);
  }

  protected abstract getStyle(): T;
}