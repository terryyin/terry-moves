import {useLoader } from '@react-three/fiber';
import React from 'react';
import {staticFile} from 'remotion';
import {roundedRect} from '../helpers/rounded-rectangle';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFNode } from '../video_components/GLTFNode';
import { GroupInitialState } from '../video_components/GroupInitialState';

const url = staticFile('assets/shape_sorting_box/scene.gltf')
useLoader.preload(GLTFLoader, url);

export const ProductPart: React.FC<{
	aspectRatio: number;
	baseScale: number;
}> = ({aspectRatio, baseScale}) => {

	// Calculate a rounded rectangle for the phone screen
	const screenGeometry = roundedRect({
			width: 2,
			height: 2,
			radius: 0,
		});

	const servicePersonTexture = useLoader(TextureLoader, staticFile('assets/ProductPart1.svg'));

	return (
		<>
		<GroupInitialState scale={0.1}>
      <GLTFNode url={url} nodeName="Box" scale={1} />
		</GroupInitialState>

			<mesh position={[0,0,0.76]}>
				<shapeGeometry args={[screenGeometry]}/>
					<meshBasicMaterial
						toneMapped={false}
						map={servicePersonTexture}
					/>
			</mesh>

		</>
	);
};
