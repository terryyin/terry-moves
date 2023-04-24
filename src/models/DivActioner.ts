import {ScaleAction, ThreeDUnitAction} from './Subtitles';
import LazyTransitions from './LazyTransitions';
import DivBaseActioner from './DivBaseActioner';
import { Vector2, Vector3 } from '@react-three/fiber';

export const toVector3 = (value: number | Vector2 | Vector3): [number, number, number] => {
  if (typeof value === 'number') {
    return [value, 0, 0];
  }
  if (value.length === 2) {
    return [...value, 0];
  }
  if (value.length === 3) {
    return [...value];
  }
  throw new Error('Unsupported input type');
}

export default class DivActioner extends DivBaseActioner {
	static defaultValue: LazyTransitions = new LazyTransitions({});

	protected getStyle(): LazyTransitions {
		switch (this.action.actionType) {
			case 'scale':
				return this.getScaleStyle(this.action);
			case 'move':
				return this.move(this.action);
			case 'appear':
				return this.getAppearStyle([0, 1]);
			case 'disappear':
				return this.getAppearStyle([1, 0]);
			case 'glow':
				return DivActioner.defaultValue;
			default:
				throw new Error(
					`Unknown action type for div ${this.action.actionType}`
				);
		}
	}

	private getAppearStyle(outputRange: number[]): LazyTransitions {
		const result = new LazyTransitions({});
		result.setOpacityInterpolation({
			inputRange: this.effectCalculator.frameRange,
			outputRange,
		});
		return result;
	}

	private move(action: ThreeDUnitAction): LazyTransitions {
		const result = new LazyTransitions({});
		const vector: [number, number, number] = toVector3(action.distances);

		result.setTranslateXInterpolation({
			inputRange: this.effectCalculator.frameRange,
			outputRange: [0, vector[0]],
		});
		result.setTranslateYInterpolation({
			inputRange: this.effectCalculator.frameRange,
			outputRange: [0, vector[1]],
		});
		return result;
	}

	private getScaleStyle(action: ScaleAction): LazyTransitions {
		const result = new LazyTransitions({});
		result.setScaleInterpolation({
			inputRange: this.effectCalculator.frameRange,
			outputRange: action.outputRange,
		});
		return result;
	}
}
