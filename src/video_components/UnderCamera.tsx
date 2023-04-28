import React, { useEffect } from 'react';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { useThree } from '@react-three/fiber';

export const UnderCamera: React.FC<{
	cameraY?: number,
	cameraDistance: number,
	lookAtY?: number,
  children: React.ReactNode;
}> = ({cameraY, cameraDistance, lookAtY, children}) => {
	const animationContextWrapper = useAnimationContext();
	const { position, lookAtD } = animationContextWrapper.get3DObjectStateOf("camera");


	// Place a camera and set the distance to the object.
	// Then make it look at the object.
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		camera.position.set(position.x, (cameraY ?? -0) + position.y, cameraDistance + position.z);
		camera.near = 0.2;
		camera.far = Math.max(5000, cameraDistance * 2);
		camera.lookAt(lookAtD.x, (lookAtY ?? 0) + lookAtD.y, lookAtD.z);
	}, [camera, cameraDistance, lookAtY , cameraY, lookAtD, position]);


	return (
		<group>{children}</group>
	);
};
