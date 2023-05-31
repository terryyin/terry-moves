import React from 'react';
import {AbsoluteFill } from 'remotion';
import useParentSize from '../hooks/useParentSize';
import { ThreeDFrameInner } from './private/ThreeDFrameInner';
import { ThreeCanvas } from '@remotion/three';

const container: React.CSSProperties = {
	width: '100%',
	height: '100%',
	// Border: '1px solid red',
};

export const ThreeDFrame: React.FC<{
	cameraY?: number,
	cameraZ?: number,
	lookAtY?: number,
	lookAtZ?: number,
	debug?: boolean,
  children: React.ReactNode;
}> = ({cameraY, cameraZ, lookAtY, lookAtZ, debug, children}) => {
	const {ref, metrics} = useParentSize();

	return (
		<AbsoluteFill ref={ref} style={container} >
		<ThreeCanvas linear width={metrics.width} height={metrics.height} >
			<ThreeDFrameInner debug={debug} cameraY={cameraY} cameraZ={cameraZ} lookAtY={lookAtY} lookAtZ={lookAtZ}>
				{children}
			</ThreeDFrameInner>
		</ThreeCanvas>
		</AbsoluteFill>
	);
};
