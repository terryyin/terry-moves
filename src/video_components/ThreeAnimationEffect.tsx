import React  from 'react';
import { useAnimationContext } from '../hooks/useAnimationContext';
import * as THREE from 'three';
import { GroupInitialState } from './GroupInitialState';

function mutliplyRotations(euler1: THREE.Euler, euler2: THREE.Euler): THREE.Euler {

	const quaternion1 = new THREE.Quaternion().setFromEuler(euler1);
	const quaternion2 = new THREE.Quaternion().setFromEuler(euler2);

	const combinedQuaternion = new THREE.Quaternion().multiplyQuaternions(quaternion1, quaternion2);
	return new THREE.Euler().setFromQuaternion(combinedQuaternion);
}


export const ThreeAnimationEffect: React.FC<{
	actor: string,
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  children: React.ReactNode;
}> = ({actor, position: intialPosition, rotation: initialRotation, scale: initialScale, children, }) => {

	const animationContextWrapper = useAnimationContext();
	const { scale, position, rotation, opacity } = animationContextWrapper.get3DObjectStateOf(actor);

	return (
		<GroupInitialState
			rotation={ rotation.toArray() as [number, number, number] }
			position={ position.toArray() as [number, number, number] }
		>
		<GroupInitialState
			scale={scale * (initialScale ?? 1)}
			rotation={ initialRotation }
			position={ intialPosition }
		>
			{opacity > 0.1 && children}
		</GroupInitialState>
		</GroupInitialState>
	);
};
