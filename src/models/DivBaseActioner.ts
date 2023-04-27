import { Vector2, Vector3 } from '@react-three/fiber';
import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';
import LazyTransitions, { InterpolateFields } from './LazyTransitions';
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

		(['translateX', 'translateY', 'translateZ'] as InterpolateFields[]).forEach((key, index) => {
			result.setInterpolation(key, {
				interpolateType: 'spring',
				inputRange: this.effectCalculator.frameRange,
				outputRange: [from[index], vector[index]],
			});
		});

		return result;
	}

	protected oscillate(distances: number | Vector3 | Vector2): LazyTransitions {
		const result = new LazyTransitions();
		const vector: [number, number, number] = toVector3(distances);

		(['oscillateX', 'oscillateY', 'oscillateZ'] as InterpolateFields[]).forEach((key, index) => {
			result.setInterpolation(key, {
				interpolateType: 'oscillate',
				inputRange: this.effectCalculator.frameRange,
				distance: vector[index],
			});
		});
		return result;
	}

	protected scale(outputRange: number[]): LazyTransitions {
		const result = new LazyTransitions();
		result.setInterpolation(
			'scale',
			{
				interpolateType: 'spring',
				inputRange: this.effectCalculator.frameRange,
				outputRange,
			});
		return result;
	}

  protected cameraZoomIn(distance: number): LazyTransitions {
    const result = new LazyTransitions();
    result.setInterpolation('cameraDistanceD', {interpolateType: 'spring', inputRange: this.effectCalculator.frameRange, outputRange: [0, distance]});
    return result;
  }

  protected cameraLookAt(position: number | Vector3 | Vector2): LazyTransitions {
    const result = new LazyTransitions();

		(['cameraLookAtX', 'cameraLookAtY', 'cameraLookAtZ'] as InterpolateFields[]).forEach((key, index) => {
      result.setInterpolation(key, {interpolateType: 'spring', inputRange: this.effectCalculator.frameRange, outputRange: [0, toVector3(position)[index]]});
		});
    return result;
  }

	protected rotate(rotation: [number, number, number]): LazyTransitions {
		return this.rotateFromTo([0, 0, 0], rotation);
	}

	protected rotateFrom(rotation: [number, number, number]): LazyTransitions {
		return this.rotateFromTo(rotation, [0, 0, 0]);
	}

	private rotateFromTo(from: [number, number, number], to: [number, number, number]): LazyTransitions {
    const result = new LazyTransitions();
		(['rotationX', 'rotationY', 'rotationZ'] as InterpolateFields[]).forEach((key, index) => {
      result.setInterpolation(key, {interpolateType: 'spring', inputRange: this.effectCalculator.frameRange, outputRange: [Math.PI * from[index]/180, Math.PI * to[index]/180]});
		});
    return result;
	}

}