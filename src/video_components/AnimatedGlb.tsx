import React from 'react';
import {useLoader } from '@react-three/fiber';
import { Clone, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';
import { Group } from 'three/src/Three';

export const AnimatedGlb: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  url: string,
  scale: number;
}> = ({ position, rotation, scale, url }) => {
  const groupRef = React.useRef<Group>();
  const { scene, animations } = useLoader(GLTFLoader, url);
  const { actions } = useAnimations(animations, groupRef);

  // Start the desired animation
  React.useEffect(() => {
    actions.Action.play();
  }, [actions]);

  return (
    <group ref={groupRef} scale={scale} position={position} rotation={ rotation || [0, 0, 0]}>
      <Clone object={scene} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} />
    </group>
  );
};
