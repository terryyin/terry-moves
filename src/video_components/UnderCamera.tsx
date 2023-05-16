import React, { useEffect } from 'react';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { useThree } from '@react-three/fiber';

export const UnderCamera: React.FC<{
	cameraY?: number,
	cameraZ?: number,
	cameraDistance: number,
	lookAtY?: number,
	lookAtZ?: number,
  children: React.ReactNode;
}> = ({cameraY, cameraZ, cameraDistance, lookAtY, lookAtZ, children}) => {
	const animationContextWrapper = useAnimationContext();
	const { position, lookAtD } = animationContextWrapper.get3DObjectStateOf("camera");


	// Place a camera and set the distance to the object.
	// Then make it look at the object.
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		camera.position.set(position.x, (cameraY ?? -0) + position.y, cameraDistance + position.z + (cameraZ ?? 0));
		camera.near = 0.2;
		camera.far = Math.max(5000, cameraDistance * 3);
		camera.lookAt(lookAtD.x, (lookAtY ?? 0) + lookAtD.y, (lookAtZ ?? 0) + lookAtD.z);
	}, [camera, cameraDistance, lookAtY, lookAtZ, cameraY, cameraZ, lookAtD, position]);


	return (
		<group>{children}</group>
	);
};
