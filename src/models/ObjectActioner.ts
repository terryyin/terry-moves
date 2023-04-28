import { Vector2, Vector3 } from '@react-three/fiber';
import LazyTransitions, { InterpolateFields, InterpolateRangesLinear, InterpolateRangesOscillate, InterpolateRangesSpring } from './LazyTransitions';
import BaseActioner from './BaseActioner';

const toVector3 = (value: number | Vector2 | Vector3): [number, number, number] => {
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

export default class ObjectActioner extends BaseActioner {
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
				return this.glow();
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

  private glow(): LazyTransitions {
    const result = new LazyTransitions();
    result.setInterpolation('glow', 
		new InterpolateRangesLinear(this.effectCalculator.frameRange, [0, 1]));
    return result;
  }

	private type(): LazyTransitions {
			const result = new LazyTransitions();
		result.setInterpolation('textReveal', 
		new InterpolateRangesLinear(this.effectCalculator.frameRange, [0, 1.2])); // 1.3 is a hack to simulate escape in vim.
		return result;
	}

	private getAppearStyle(outputRange: number[]): LazyTransitions {
		const result = new LazyTransitions();
		result.setInterpolation('opacity', 
		new InterpolateRangesLinear(this.effectCalculator.frameRange, outputRange));
		return result;
	}

	private move(from: [number, number, number], distances: number | Vector2 | Vector3): LazyTransitions {
		const result = new LazyTransitions();
		const vector: [number, number, number] = toVector3(distances);

		(['translateX', 'translateY', 'translateZ'] as InterpolateFields[]).forEach((key, index) => {
			result.setInterpolation(key,
				new InterpolateRangesSpring(this.effectCalculator.frameRange, [from[index], vector[index]]),
			);
		});

		return result;
	}

	private oscillate(distances: number | Vector3 | Vector2): LazyTransitions {
		const result = new LazyTransitions();
		const vector: [number, number, number] = toVector3(distances);

		(['oscillateX', 'oscillateY', 'oscillateZ'] as InterpolateFields[]).forEach((key, index) => {
			result.setInterpolation(key, 
				new InterpolateRangesOscillate(
				this.effectCalculator.frameRange,
				vector[index],
			));
		});
		return result;
	}

	private scale(outputRange: number[]): LazyTransitions {
		const result = new LazyTransitions();
		result.setInterpolation(
			'scale',
			new InterpolateRangesSpring(this.effectCalculator.frameRange, outputRange),
		);
		return result;
	}

  private cameraLookAt(position: number | Vector3 | Vector2): LazyTransitions {
    const result = new LazyTransitions();

		(['cameraLookAtX', 'cameraLookAtY', 'cameraLookAtZ'] as InterpolateFields[]).forEach((key, index) => {
      result.setInterpolation(key, new InterpolateRangesSpring(this.effectCalculator.frameRange, [0, toVector3(position)[index]]));
		});
    return result;
  }

	private rotate(rotation: [number, number, number]): LazyTransitions {
		return this.rotateFromTo([0, 0, 0], rotation);
	}

	private rotateFrom(rotation: [number, number, number]): LazyTransitions {
		return this.rotateFromTo(rotation, [0, 0, 0]);
	}

	private rotateFromTo(from: [number, number, number], to: [number, number, number]): LazyTransitions {
    const result = new LazyTransitions();
		(['rotationX', 'rotationY', 'rotationZ'] as InterpolateFields[]).forEach((key, index) => {
      result.setInterpolation(key, new InterpolateRangesSpring(this.effectCalculator.frameRange, [Math.PI * from[index]/180, Math.PI * to[index]/180]));
		});
    return result;
	}

}