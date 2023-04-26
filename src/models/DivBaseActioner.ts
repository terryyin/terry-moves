import { Vector2, Vector3 } from '@react-three/fiber';
import { Action } from '@/models/Subtitles';
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

	protected move(from: [number, number, number], distances: number | Vector2 | Vector3): LazyTransitions {
		const result = new LazyTransitions();
		const vector: [number, number, number] = toVector3(distances);

		result.setInterpolation('translateX', {
      spring: true,
			inputRange: this.effectCalculator.frameRange,
			outputRange: [from[0], vector[0]],
		});
		result.setInterpolation('translateY', {
      spring: true,
			inputRange: this.effectCalculator.frameRange,
			outputRange: [from[1], vector[1]],
		});
		return result;
	}

}