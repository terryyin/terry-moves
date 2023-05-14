import React, { CSSProperties } from 'react';
import AnimationEffect from '../video_components/AnimationEffect';

export const Adaptiveness: React.FC<{style?: CSSProperties}> = ({ style }) => {
  return (
      <div style={style}>
				<AnimationEffect actor="adaptiveness-text">
					ADAPTIVENESS
				</AnimationEffect>
      </div>
  );
};