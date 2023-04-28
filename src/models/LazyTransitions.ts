import * as THREE from 'three';
import EffectCalculator from './EffectCalculator';
import {ThreeDObjectState} from './ThreeDObjectState';

export type TextReveal = {
	progress: number;
	cursorShow: boolean;
};

abstract class InterpolateRanges {
	abstract inputRange: number[];

	getInterpolateValue(
		frame: number,
		fps: number,
		prev: number | undefined
	): number {
		const effectCalculator: EffectCalculator = new EffectCalculator(
			(this.inputRange[this.inputRange.length - 1] - this.inputRange[0]) / fps,
			this.inputRange[0] / fps,
			frame,
			fps
		);

		return this.calculate(effectCalculator, prev);
	}

	abstract asPreviousValue(prev: number | undefined, frame: number): number | undefined;
	protected abstract calculate(effectCalculator: EffectCalculator, prev?: number): number;



}

export class InterpolateRangesOscillate extends InterpolateRanges {
	inputRange: number[];
	distance: number;

	constructor(inputRange: number[], distance: number) {
		super();
		this.inputRange = inputRange;
		this.distance = distance;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	asPreviousValue(prev: number | undefined, frame: number): number | undefined {
		return prev;
	}

	protected calculate(effectCalculator: EffectCalculator, prev?: number) {
		const result =
			-Math.sin(effectCalculator.timeWithIn() * Math.PI * 2) * this.distance;
		return result + (prev ?? 0);
	}
}

export class InterpolateRangesSpring extends InterpolateRanges {
	outputRange: number[];
	inputRange: number[];

	constructor(inputRange: number[], outputRange: number[]) {
		super();
		this.inputRange = inputRange;
		this.outputRange = outputRange;
	}

	protected calculate(effectCalculator: EffectCalculator, prev?: number) {
		const outputRange = [...this.outputRange];
		if (prev) {
			outputRange[0] = prev;
		}

		return effectCalculator.interpolateSpring(outputRange);
	}

	asPreviousValue(prev: number | undefined, frame: number): number | undefined {
		if (frame >= this.inputRange[this.inputRange.length - 1])
			return this.outputRange[this.outputRange.length - 1];
		return prev;
	}
}

export class InterpolateRangesLinear extends InterpolateRanges {
	inputRange: number[];
	private outputRange: number[];

	constructor(inputRange: number[], outputRange: number[]) {
		super();
		this.inputRange = inputRange;
		this.outputRange = outputRange;
	}

	protected calculate(effectCalculator: EffectCalculator, prev?: number) {
		const outputRange = [...this.outputRange];
		if (prev) {
			outputRange[0] = prev;
		}

		return effectCalculator.interpolateDuration(outputRange);
	}

	asPreviousValue(prev: number | undefined, frame: number): number | undefined {
		if (frame >= this.inputRange[this.inputRange.length - 1])
		  return this.outputRange[this.outputRange.length - 1];
		return prev;
	}
}

export type InterpolateFields =
	| 'glow'
	| 'textReveal'
	| 'rotationX'
	| 'rotationY'
	| 'rotationZ'
	| 'oscillateX'
	| 'oscillateY'
	| 'oscillateZ'
	| 'cameraLookAtX'
	| 'cameraLookAtY'
	| 'cameraLookAtY'
	| 'opacity'
	| 'scale'
	| 'translateY'
	| 'translateX'
	| 'translateZ';

export default class LazyTransitions {
	interpolateRanges: Map<InterpolateFields, InterpolateRanges[]> = new Map();

	setInterpolation(
		key: InterpolateFields,
		interpolateRange: InterpolateRanges
	): void {
		if (!this.interpolateRanges.get(key)) {
			this.interpolateRanges.set(key, []);
		}
		const array = this.interpolateRanges.get(key);
		if (array) {
			array.push(interpolateRange);
		}
	}

	combine(prev: LazyTransitions): LazyTransitions {
		const combinedStyle = new LazyTransitions();
		(
			[
				'glow',
				'textReveal',
				'rotationX',
				'rotationY',
				'rotationZ',
				'oscillateX',
				'oscillateY',
				'oscillateZ',
				'cameraLookAtX',
				'cameraLookAtY',
				'cameraLookAtY',
				'opacity',
				'scale',
				'translateX',
				'translateY',
				'translateZ',
			] as InterpolateFields[]
		).forEach((key) => {
			const combined = [
				...(prev.interpolateRanges.get(key) || []),
				...(this.interpolateRanges.get(key) || []),
			];
			combinedStyle.interpolateRanges.set(key, combined);
		});

		return combinedStyle;
	}

	get3DObjedctState(frame: number, fps: number): ThreeDObjectState {
		const result = new ThreeDObjectState();
		result.glow = this.getAddingInterpolate(frame, fps, 'glow') ?? 0;
		result.scale = this.getMultiplyingInterpolate(frame, fps, 'scale') ?? 1;
		result.opacity = this.getMultiplyingInterpolate(frame, fps, 'opacity') ?? 1;

		const position = [0, 0, 0];
		(['translateX', 'translateY', 'translateZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				const translate = this.getAddingInterpolate(frame, fps, key);
				if (translate !== undefined) {
					position[index] = translate;
				}
			}
		);

		const oscillation = [0, 0, 0];
		(['oscillateX', 'oscillateY', 'oscillateZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				const translate = this.getAddingInterpolate(frame, fps, key);
				if (translate !== undefined) {
					oscillation[index] = translate;
				}
			}
		);
		result.position = new THREE.Vector3(
			position[0] + oscillation[0],
			position[1] + oscillation[1],
			position[2] + oscillation[2]
		);

		const cameraLookAt = [0, 0, 0];
		(
			['cameraLookAtX', 'cameraLookAtY', 'cameraLookAtZ'] as InterpolateFields[]
		).forEach((key, index) => {
			const translate = this.getAddingInterpolate(frame, fps, key);
			if (translate !== undefined) {
				cameraLookAt[index] = translate;
			}
		});

		result.lookAtD = new THREE.Vector3(
			cameraLookAt[0],
			cameraLookAt[1],
			cameraLookAt[2]
		);

		const rotation = [0, 0, 0];
		(['rotationX', 'rotationY', 'rotationZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				const translate = this.getAddingInterpolate(frame, fps, key);
				if (translate !== undefined) {
					rotation[index] = translate;
				}
			}
		);
		result.rotation = new THREE.Euler(rotation[0], rotation[1], rotation[2]);

		return result;
	}

	getTextReveal(adjustedFrame: number, fps: number): TextReveal {
		return {
			progress:
				this.getAddingInterpolate(adjustedFrame, fps, 'textReveal') ?? 0,
			cursorShow: adjustedFrame / fps - Math.floor(adjustedFrame / fps) <= 0.5,
		};
	}

	private getAddingInterpolate(
		frame: number,
		fps: number,
		field: InterpolateFields
	): number | undefined {
		return this.reduceInterpolate(frame, fps, field, (a, b) => a + b, 0);
	}

	private getMultiplyingInterpolate(
		frame: number,
		fps: number,
		field: InterpolateFields
	): number | undefined {
		return this.reduceInterpolate(frame, fps, field, (a, b) => a * b, 1);
	}

	// eslint-disable-next-line max-params
	private reduceInterpolate(
		frame: number,
		fps: number,
		field: InterpolateFields,
		oper: (a: number, b: number) => number,
		defaultValue: number
	): number | undefined {
		const values = this.getInterpolateValues(frame, fps, field);
		if (values.length === 0) return undefined;
		return values.reduce(oper, defaultValue);
	}

	private getInterpolateValues(
		frame: number,
		fps: number,
		field: InterpolateFields
	): number[] {
		const interpolateRanges = this.interpolateRanges.get(field);
		const result: number[] = [];
		if (!interpolateRanges || interpolateRanges.length === 0) return result;
		let prev: number | undefined;
		let current = interpolateRanges[0];
		for (let i = 0; i < interpolateRanges.length; i++) {
			if (frame >= interpolateRanges[i].inputRange[0]) {
				current = interpolateRanges[i];
				const prevAny = interpolateRanges[i - 1];
				if (i > 0) {
				  prev = prevAny.asPreviousValue(prev, frame)
				}
				if (frame < current.inputRange[current.inputRange.length - 1]) {
					result.push(current.getInterpolateValue(frame, fps, prev));
				}
			}
		}
		if (result.length === 0) {
			result.push(current.getInterpolateValue(frame, fps, prev));
		}

		return result;
	}
}
