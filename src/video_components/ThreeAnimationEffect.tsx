import {Euler, useThree} from '@react-three/fiber';
import React, {useEffect} from 'react';
import {
	CAMERA_DISTANCE,
} from '../helpers/layout';
import { useAnimationContext } from '../hooks/useAnimationContext';

export const ThreeAnimationEffect: React.FC<{
	id: string,
  children: React.ReactNode;
}> = ({id, children, }) => {
	const animationContextWrapper = useAnimationContext();

	// Place a camera and set the distance to the object.
	// Then make it look at the object.
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		camera.position.set(0, -0.5, CAMERA_DISTANCE);
		camera.near = 0.2;
		camera.far = Math.max(5000, CAMERA_DISTANCE * 2);
		camera.lookAt(0, 0, 0);
	}, [camera]);

	const { scale, position, rotation } = animationContextWrapper.get3DGroupAttributes(id);

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
