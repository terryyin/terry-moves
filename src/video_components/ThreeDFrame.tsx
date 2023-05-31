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
	cameraZ?: number,
	debug?: boolean,
  children: React.ReactNode;
}> = ({cameraZ, debug, children}) => {
	const {ref, metrics} = useParentSize();

	return (
		<AbsoluteFill ref={ref} style={container} >
		<ThreeCanvas linear width={metrics.width} height={metrics.height} >
			<ThreeDFrameInner debug={debug} cameraZ={cameraZ}>
				{children}
			</ThreeDFrameInner>
		</ThreeCanvas>
		</AbsoluteFill>
	);
};
