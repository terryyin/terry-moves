import React, { useEffect } from 'react';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { useThree } from '@react-three/fiber';

export const UnderCamera: React.FC<{
	cameraY?: number,
	cameraZ?: number,
	lookAtZ?: number,
  children: React.ReactNode;
}> = ({cameraY, cameraZ, lookAtZ, children}) => {
	const animationContextWrapper = useAnimationContext();
	const { position, lookAtD } = animationContextWrapper.get3DObjectStateOf("camera");


	// Place a camera and set the distance to the object.
	// Then make it look at the object.
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		camera.position.set(position.x, (cameraY ?? -0) + position.y, position.z + (cameraZ ?? 0));
		camera.near = 0.2;
		camera.lookAt(lookAtD.x,  lookAtD.y, (lookAtZ ?? 0) + lookAtD.z);
	}, [camera, lookAtZ, cameraY, cameraZ, lookAtD, position]);


	return (
		<group>{children}</group>
	);
};
