import {ThreeCanvas } from '@remotion/three';
import React from 'react';
import {AbsoluteFill } from 'remotion';
import {Phone} from '../Phone';
import useParentSize from '../hooks/useParentSize';

const container: React.CSSProperties = {
	width: '100%',
	height: '100%',
	backgroundColor: 'red',
};

export const ProductFrame: React.FC<{
	baseScale: number;
}> = ({baseScale}) => {
	const {ref, size} = useParentSize();

	return (
		<AbsoluteFill ref={ref} style={container} >
				<ThreeCanvas linear width={size.width} height={size.height} >
					<ambientLight intensity={1.5} color={0xffffff} />
					<pointLight position={[10, 10, 0]} />
					<Phone
						baseScale={1.4}
						aspectRatio={1}
					/>
				</ThreeCanvas>
		</AbsoluteFill>
	);
};
