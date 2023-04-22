import React from 'react';
import {staticFile} from 'remotion';
import { AnimatedGlb } from '../video_components/AnimatedGlb';
import { GroupInitialState } from '../video_components/GroupInitialState';

export const RocketPlume: React.FC<{
  position: [number, number, number]
  scale: number,
  actor: string,
}> = ({position, scale, actor}) => {

  return (
    <GroupInitialState rotation={[Math.PI, 0, 0]} position={position} scale={scale}>
      <AnimatedGlb url={staticFile('assets/simple_engine_plume_test.glb')} actor={actor} />
    </GroupInitialState>
  );
};
