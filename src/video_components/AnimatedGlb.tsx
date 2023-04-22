import React from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { Clone, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';
import { Group } from 'three/src/Three';
import { useCurrentFrame, spring } from 'remotion';
import * as THREE from 'three';

export const AnimatedGlb: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  url: string,
  loopOnce: boolean,
  scale: number;
}> = ({ position, rotation, scale, url, loopOnce }) => {
  const groupRef = React.useRef<Group>();
  const { scene, animations } = useLoader(GLTFLoader, url);
  const { actions, mixer } = useAnimations(animations, groupRef);

  const startFrame = 30;
  const frame = useCurrentFrame();

  // Start the desired animation
  React.useEffect(() => {
    // If (frame < startFrame) {
    //   return;
    // }

    const keys = Object.keys(actions);
    keys.forEach((key) => {
      const action = actions[key];
      if(loopOnce) {
        action.setLoop(THREE.LoopOnce, 1); // Set loop mode to LoopOnce
        action.clampWhenFinished = true; // Clamp when the animation finishes
      }
      action.play();
    });
  }, [actions, frame, startFrame]);

  useFrame(() => {
    mixer.setTime((frame - startFrame) / 30);
  });

  return (
    <group ref={groupRef} scale={scale} position={position} rotation={ rotation || [0, 0, 0]}>
      <Clone object={scene} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} />
    </group>
  );
};
