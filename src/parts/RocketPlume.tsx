import React from 'react';
import {staticFile} from 'remotion';
import { AnimatedGlb } from '../video_components/AnimatedGlb';

export const RocketPlume: React.FC<{
  position: [number, number, number];
  scale: number;
}> = ({ position, scale }) => {

  return (
    <AnimatedGlb url={ staticFile('assets/simple_engine_plume_test.glb') }
     position={position}
     scale={scale }
     rotation= {[Math.PI, 0, 0]}
      />
  );
};
