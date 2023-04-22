import React from 'react';
import {staticFile} from 'remotion';
import {useLoader } from '@react-three/fiber';
import { Clone, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';
import { Group } from 'three/src/Three';

export const RocketPlume: React.FC<{
  position: [number, number, number];
  scale: number;
}> = ({ position, scale }) => {
  const url = staticFile('assets/simple_engine_plume_test.glb')
  const groupRef = React.useRef<Group>();
  const { scene, animations } = useLoader(GLTFLoader, url);
  const { actions } = useAnimations(animations, groupRef);

  // Start the desired animation
  React.useEffect(() => {
    actions.Action.play();
  }, [actions]);

  return (
    <group ref={groupRef} scale={scale} position={position} rotation={[Math.PI, 0, 0]}>
      <Clone object={scene} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} />
    </group>
  );
};
