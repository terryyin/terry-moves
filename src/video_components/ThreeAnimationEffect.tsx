import {useThree} from '@react-three/fiber';
import React, {useEffect} from 'react';
import {interpolate, } from 'remotion';
import {
	CAMERA_DISTANCE,
} from '../helpers/layout';
import { useAnimationContext } from '../hooks/useAnimationContext';

export const ThreeAnimationEffect: React.FC<{
	id: string,
  children: React.ReactNode;
}> = ({id, children, }) => {
	const animationContextWrapper = useAnimationContext();
	const frame = animationContextWrapper.animationContext.globalFrame;
	const fps = animationContextWrapper.animationContext.globalFps;
	const durationInFrames = 1000;

	// Place a camera and set the distance to the object.
	// Then make it look at the object.
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		camera.position.set(0, 0, CAMERA_DISTANCE);
		camera.near = 0.2;
		camera.far = Math.max(5000, CAMERA_DISTANCE * 2);
		camera.lookAt(0, 0, 0);
	}, [camera]);

	// During the whole scene, the phone is rotating.
	// 2 * Math.PI is a full rotation.
	const constantRotation = interpolate(
		frame,
		[0, durationInFrames],
		[0, Math.PI * durationInFrames / fps]
	);

	// Calculating the total rotation of the phone
	const rotateY = constantRotation;

	const { scale, position } = animationContextWrapper.get3DPosition(id);

	return (
		<group
			scale={scale}
			rotation={[0, rotateY, 0]}
			position={ position }
		>
			{children}
		</group>
	);
};
