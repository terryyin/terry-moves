import {CSSProperties} from 'react';
import * as THREE from 'three';

export class ThreeGroupAttributes {
	opacity: number;
	scale: number;
	position: THREE.Vector3;
	rotation: THREE.Euler;
	lookAtD: THREE.Vector3;

	constructor() {
		this.opacity = 1;
		this.scale = 1;
		this.position = new THREE.Vector3();
		this.rotation = new THREE.Euler();
		this.lookAtD = new THREE.Vector3();
	}

	toStyle(): CSSProperties {
		const transforms: string[] = [];

		transforms.push(`scale(${this.scale})`);

		['translateX', 'translateY', 'translateZ'].forEach((key, index) => {
			const translate = this.position.getComponent(index);
			if (translate !== undefined) {
				transforms.push(`${key}(${translate}px)`);
			}
		});

		const result: CSSProperties = {transformOrigin: 'center'};
		result.transformOrigin = 'center';

		if (transforms.length > 0) {
			result.transform = transforms.join(' ');
		}

		result.opacity = this.opacity;

		return result;
	}
}
