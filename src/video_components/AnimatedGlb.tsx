import React from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { Clone, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';
import { Group } from 'three/src/Three';
import { useAnimationContext } from '../hooks/useAnimationContext';

export const AnimatedGlb: React.FC<{
  actor: string,
  url: string,
}> = ({ actor, url }) => {
	const animationContextWrapper = useAnimationContext();
	const {playing, time } = animationContextWrapper.getGLBAnimationAttributes(actor);

  const groupRef = React.useRef<Group | null>(null);
  const { scene, animations } = useLoader(GLTFLoader, url);
  const { actions, mixer } = useAnimations(animations, groupRef);

  React.useEffect(() => {
    const keys = Object.keys(actions);
    keys.forEach((key) => {
      const action = actions[key];
      if(action) {
        action?.play();
      }
    });
  }, [actions, time]);


  useFrame(() => {
    if(time !== undefined) {
      mixer.setTime(time);
    }
  });


  return (
    <group ref={groupRef} visible={playing}>
      <Clone object={scene} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} />
    </group>
  );
};
