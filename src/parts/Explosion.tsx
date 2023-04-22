import React from 'react';
import {staticFile} from 'remotion';
import { AnimatedGlb } from '../video_components/AnimatedGlb';

export const Explosion: React.FC<{
  actor: string,
}> = ({ actor }) => {
  const url = staticFile('assets/animated_low_poly_explosion.glb') 
  return (
    <AnimatedGlb url={url} actor={actor}/>
  );
};
