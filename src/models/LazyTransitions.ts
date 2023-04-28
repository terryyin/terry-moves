import * as THREE from 'three';
import {ThreeDObjectState} from './ThreeDObjectState';
import {InterpolateRanges} from './InterpolateRanges';
import {InterpolatesOfField} from './InterpolatesOfField';

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

const allFields = [
	{name: 'glow', type: 'additive'},
	{name: 'textReveal', type: 'additive'},
	{name: 'rotationX', type: 'additive'},
	{name: 'rotationY', type: 'additive'},
	{name: 'rotationZ', type: 'additive'},
	{name: 'oscillateX', type: 'additive'},
	{name: 'oscillateY', type: 'additive'},
	{name: 'oscillateZ', type: 'additive'},
	{name: 'cameraLookAtX', type: 'additive'},
	{name: 'cameraLookAtY', type: 'additive'},
	{name: 'cameraLookAtY', type: 'additive'},
	{name: 'opacity', type: 'multiplitive'},
	{name: 'scale', type: 'multiplitive'},
	{name: 'translateX', type: 'additive'},
	{name: 'translateY', type: 'additive'},
	{name: 'translateZ', type: 'additive'},
] as {name: InterpolateFields; type: 'additive' | 'multiplitive'}[];

export default class LazyTransitions {
	interpolateRanges: Map<InterpolateFields, InterpolatesOfField>;

	constructor() {
		this.interpolateRanges = new Map();
		allFields.forEach(({name, type}) => {
			this.interpolateRanges.set(name, new InterpolatesOfField(type));
		});
	}

	private sureGetField(key: InterpolateFields): InterpolatesOfField {
		const field = this.interpolateRanges.get(key);
		if (!field) {
			throw new Error(`Unknown interpolation field ${key}`);
		}
		return field;
	}

	setInterpolation(
		key: InterpolateFields,
		interpolateRange: InterpolateRanges
	): void {
		const field = this.sureGetField(key);
		field.add(interpolateRange);
	}

	combine(prev: LazyTransitions): LazyTransitions {
		const combinedStyle = new LazyTransitions();
		allFields.forEach(({name}) => {
			const combined = this.sureGetField(name)
				.combine(prev.interpolateRanges.get(name));
			combinedStyle.interpolateRanges.set(name, combined);
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
		const interpolateRanges = this.interpolateRanges.get(field);
		if (!interpolateRanges) return defaultValue;
		const values = interpolateRanges.getInterpolateValues(frame, fps);
		if (values.length === 0) return undefined;
		return values.reduce(oper, defaultValue);
	}
}
