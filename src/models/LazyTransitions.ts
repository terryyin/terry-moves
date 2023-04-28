import * as THREE from 'three';
import {ThreeDObjectState} from './ThreeDObjectState';
import { InterpolateRanges } from './InterpolateRanges';

export type TextReveal = {
	progress: number;
	cursorShow: boolean;
};

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

type InterpolatesOfField = InterpolateRanges[];
export default class LazyTransitions {
	interpolateRanges: Map<InterpolateFields, InterpolatesOfField> = new Map();

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
		if (!interpolateRanges) return [];
		return this.getInterpolateValues1(frame, fps, interpolateRanges);
	}

	private getInterpolateValues1(
		frame: number,
		fps: number,
		interpolateRanges: InterpolateRanges[],
	): number[] {
		const result: number[] = [];
		if (interpolateRanges.length === 0) return [];
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
