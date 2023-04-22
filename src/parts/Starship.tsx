import {useLoader } from '@react-three/fiber';
import React from 'react';
import {staticFile, useVideoConfig} from 'remotion';
import { GLTFLoader } from 'three-stdlib';

const url = staticFile('assets/spacex_starship_sn24_superheavy_bn7.glb')
export const Starship: React.FC<{
	aspectRatio: number;
	baseScale: number;
}> = ({aspectRatio, baseScale}) => {
	useVideoConfig();
	const { scene } = useLoader(GLTFLoader, url);

  return <primitive object={scene} />;
};