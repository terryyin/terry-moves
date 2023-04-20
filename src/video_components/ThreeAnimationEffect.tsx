import {useThree} from '@react-three/fiber';
import React, {useEffect} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {
	CAMERA_DISTANCE,
} from '../helpers/layout';

export const ThreeAnimationEffect: React.FC<{
  children: React.ReactNode;
}> = ({children, }) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

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

	// When the composition starts, there is some extra
	// rotation and translation.
	const entranceAnimation = spring({
		frame,
		fps,
		config: {
			damping: 200,
			mass: 3,
		},
	});

	// Calculate the entrance rotation,
	// doing one full spin
	const entranceRotation = interpolate(
		entranceAnimation,
		[0, 1],
		[-Math.PI, Math.PI]
	);

	// Calculating the total rotation of the phone
	const rotateY = entranceRotation + constantRotation;

	// Calculating the translation of the phone at the beginning.
	// The start position of the phone is set to 4 "units"
	const translateY = interpolate(entranceAnimation, [0, 1], [-4, 0]);

	return (
		<group
			scale={entranceAnimation}
			rotation={[0, rotateY, 0]}
			position={[0, translateY, 0]}
		>
			{children}
		</group>
	);
};
