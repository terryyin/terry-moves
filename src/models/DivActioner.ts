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
	static defaultValue: LazyTransitions = new LazyTransitions();

	protected getStyle(): LazyTransitions {
		switch (this.action.actionType) {
			case 'type':
				return this.type();
			case 'scale':
				return this.scale(this.action.outputRange);
			case 'move':
				return this.move([0, 0, 0], this.action.absolutePosition);
			case 'appear':
				return this.getAppearStyle([0, 1]);
			case 'disappear':
				return this.getAppearStyle([1, 0]);
			case 'glow':
				return DivActioner.defaultValue;
			case 'rotate and rise':
				return this.scale([0, 1])
					.combine(this.move([0, -this.action.value, 0], [0, 0, 0]))
					.combine(this.rotateFrom([0, -360, 0]));
			case 'oscillate':
				return this.oscillate(this.action.delta);
			case 'camera look at':
				return  this.cameraLookAt(this.action.absolutePosition);
			case '3d rotate':
				return  this.rotate(this.action.totalRotation);
			default:
				return new LazyTransitions();
		}
	}

	private type(): LazyTransitions {
			const result = new LazyTransitions();
		result.setInterpolation('textReveal', {
			interpolateType: 'linear',
			inputRange: this.effectCalculator.frameRange,
			outputRange: [0, 1.2], // 1.3 is a hack to simulate escape in vim.
		});
		return result;
	}

	private getAppearStyle(outputRange: number[]): LazyTransitions {
		const result = new LazyTransitions();
		result.setInterpolation('opacity', {
			interpolateType: 'linear',
			inputRange: this.effectCalculator.frameRange,
			outputRange,
		});
		return result;
	}

}
