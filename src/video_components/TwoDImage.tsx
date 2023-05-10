import React from 'react';
import { TextureLoader, MeshBasicMaterial, PlaneGeometry,  } from 'three';
import { ThreeAnimationEffect } from './ThreeAnimationEffect';

export const TwoDImage: React.FC<{
	actor: string,
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  url: string}> = ({actor, url, position, rotation, scale}) => {
	const texture = new TextureLoader().load(url);
  const material = new MeshBasicMaterial({ map: texture, transparent: true });
  const geometry = new PlaneGeometry(5, 5);

  return <ThreeAnimationEffect actor={actor} position={position} rotation={rotation} scale={scale}>
    <mesh material={material} geometry={geometry} />
  </ThreeAnimationEffect>

};