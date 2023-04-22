import React from 'react';
import {staticFile} from 'remotion';
import { AnimatedGlb } from '../video_components/AnimatedGlb';

export const Explosion: React.FC<{
  position: [number, number, number];
  scale: number;
}> = ({ position, scale }) => {
  const url = staticFile('assets/animated_low_poly_explosion.glb') 
  return (
    <AnimatedGlb url={url}
     position={position}
     scale={scale }
     rotation= {[0, 0, 0]}
      />
  );
};
