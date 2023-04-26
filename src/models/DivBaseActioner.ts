import { Action, ThreeDUnitAction } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';
import LazyTransitions from './LazyTransitions';
import { toVector3 } from './DivActioner';

export default abstract class DivBaseActioner {
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

	protected move(action: ThreeDUnitAction): LazyTransitions {
		const result = new LazyTransitions();
		const vector: [number, number, number] = toVector3(action.distances);

		result.setTranslateXInterpolation({
      spring: true,
			inputRange: this.effectCalculator.frameRange,
			outputRange: [0, vector[0]],
		});
		result.setTranslateYInterpolation({
      spring: true,
			inputRange: this.effectCalculator.frameRange,
			outputRange: [0, vector[1]],
		});
		return result;
	}

}