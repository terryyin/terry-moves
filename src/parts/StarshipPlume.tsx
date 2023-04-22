import React from 'react';
import {staticFile} from 'remotion';
import {useLoader } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';
import { Group } from 'three/src/Three';

const url = staticFile('assets/simple_engine_plume_test.glb')
export const StarshipPlume: React.FC<{
	aspectRatio: number;
	baseScale: number;
}> = ({aspectRatio, baseScale}) => {

	const groupRef = React.useRef<Group>();
  const { scene, animations } = useLoader(GLTFLoader, url);
  const { actions } = useAnimations(animations, groupRef);

  // Start the desired animation
  React.useEffect(() => {
		console.log("xxxxx");
		console.log(actions);
		const actionNames = Object.keys(actions);
		console.log(actionNames);
		actions.Action.play();
  }, [actions]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};
