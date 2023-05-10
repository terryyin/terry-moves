import React from 'react';
import { TextureLoader, MeshBasicMaterial, PlaneGeometry,  } from 'three';

export const TwoDImage: React.FC<{url: string}> = ({url: pathToFile}) => {
	const texture = new TextureLoader().load(pathToFile);
  const material = new MeshBasicMaterial({ map: texture, transparent: true });
  const geometry = new PlaneGeometry(5, 5);

  return <mesh material={material} geometry={geometry} />

};