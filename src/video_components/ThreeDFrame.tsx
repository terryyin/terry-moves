import {ThreeCanvas } from '@remotion/three';
import React from 'react';
import {AbsoluteFill } from 'remotion';
import useParentSize from '../hooks/useParentSize';
import { UnderCamera } from './UnderCamera';

const container: React.CSSProperties = {
	width: '100%',
	height: '100%',
	// Border: '1px solid red',
};

export const ThreeDFrame: React.FC<{
	cameraY?: number,
	cameraZ?: number,
	cameraDistance: number,
	lookAtY?: number,
	lookAtZ?: number,
  children: React.ReactNode;
}> = ({cameraY, cameraZ, cameraDistance, lookAtY, lookAtZ, children}) => {
	const {ref, metrics} = useParentSize();

	return (
		<AbsoluteFill ref={ref} style={container} >
				<ThreeCanvas linear width={metrics.width} height={metrics.height} >
					<ambientLight intensity={1.5} color={0xffffff} />
					<pointLight position={[10, 10, 0]} />
					<UnderCamera cameraY={cameraY} cameraZ={cameraZ} cameraDistance={cameraDistance} lookAtY={lookAtY} lookAtZ={lookAtZ}>
					  {children}
					</UnderCamera>
				</ThreeCanvas>
		</AbsoluteFill>
	);
};
