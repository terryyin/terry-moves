import React from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { Clone, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';
import { Group } from 'three/src/Three';
import * as THREE from 'three';
import { useAnimationContext } from '../hooks/useAnimationContext';

export const AnimatedGlb: React.FC<{
  actor: string,
  url: string,
}> = ({ actor, url }) => {
	const animationContextWrapper = useAnimationContext();
	let { playing, time, loopOnce } = animationContextWrapper.getGLBAnimationAttributes(actor);
  playing = true;
  loopOnce = false;

  const groupRef = React.useRef<Group>();
  const { scene, animations } = useLoader(GLTFLoader, url);
  const { actions, mixer } = useAnimations(animations, groupRef);

  React.useEffect(() => {
    if (!playing) {
      return;
    }

    const keys = Object.keys(actions);
    keys.forEach((key) => {
      const action = actions[key];
      if(action) {
      if(loopOnce) {
          action.setLoop(THREE.LoopOnce, 1); // Set loop mode to LoopOnce
          action.clampWhenFinished = true; // Clamp when the animation finishes
        }
        action?.play();
      }
    });
  }, [actions, playing, loopOnce]);

  useFrame(() => {
    mixer.setTime(time);
  });

  return (
    <group ref={groupRef}>
      <Clone object={scene} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} />
    </group>
  );
};
