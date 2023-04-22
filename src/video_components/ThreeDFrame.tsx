import {ThreeCanvas } from '@remotion/three';
import React from 'react';
import {AbsoluteFill } from 'remotion';
import useParentSize from '../hooks/useParentSize';

const container: React.CSSProperties = {
	width: '100%',
	height: '100%',
	// Border: '1px solid red',
};

export const ThreeDFrame: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
	const {ref, size} = useParentSize();

	return (
		<AbsoluteFill ref={ref} style={container} >
				<ThreeCanvas linear width={size.width} height={size.height} >
					<ambientLight intensity={1.5} color={0xffffff} />
					<pointLight position={[10, 10, 0]} />
					{children}
				</ThreeCanvas>
		</AbsoluteFill>
	);
};
