import { useAnimationContext } from '../hooks/useAnimationContext';
import React, { CSSProperties } from 'react';
import AnimationEffect from '../video_components/AnimationEffect';

export const WindBlow: React.FC<{actor: string, style: CSSProperties}> = ({actor, style}) => {
  const context = useAnimationContext();
  const animatedX = context.getGeneralValue(actor) ?? 0;

  return (
		<AnimationEffect actor={actor} style={style}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <line x1="0" y1="25" x2={animatedX} y2="25" stroke="black" strokeWidth="2" />
      <line x1="0" y1="35" x2={animatedX + 10} y2="35" stroke="black" strokeWidth="2" />
      <line x1="0" y1="15" x2={animatedX - 10} y2="15" stroke="black" strokeWidth="2" />
    </svg>
		</AnimationEffect>
  );
};
