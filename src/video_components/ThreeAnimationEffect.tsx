import {Euler, useThree} from '@react-three/fiber';
import React, {useEffect} from 'react';
import { useAnimationContext } from '../hooks/useAnimationContext';

export const ThreeAnimationEffect: React.FC<{
	id: string,
	cameraDistance: number,
	lookAtY?: number
	cameraY?: number
  children: React.ReactNode;
}> = ({id, cameraDistance, lookAtY, cameraY, children, }) => {
	const animationContextWrapper = useAnimationContext();
	const { scale, position, rotation, lookAtD, cameraDistanceD } = animationContextWrapper.get3DGroupAttributes(id);


	// Place a camera and set the distance to the object.
	// Then make it look at the object.
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		camera.position.set(0, cameraY || -0, cameraDistance + cameraDistanceD);
		camera.near = 0.2;
		camera.far = Math.max(5000, cameraDistance * 2);
		camera.lookAt(0, (lookAtY || 0) + lookAtD.y, 0);
	}, [camera, cameraDistance, lookAtY , cameraY, lookAtD, cameraDistanceD]);


	return (
		<group
			scale={scale}
			rotation={ rotation.toArray() as Euler }
			position={ position.toArray() }
		>
			{children}
		</group>
	);
};
