import React, { CSSProperties } from 'react';
import {Img, staticFile} from 'remotion';
import { StageTransform, useAnimationContext  } from '../hooks/useAnimationContext';
import AnimationEffect from '../video_components/AnimationEffect';

const StageTransforms: StageTransform[] = [
	{ subtitleId: 'intro2', durationInSeconds: 2, outputRange: [0, 1] },
];

// eslint-disable-next-line react/no-unused-prop-types
export const CustomerGroup: React.FC<{style?: CSSProperties}> = ({ style }) => {
	const opacity = useAnimationContext().getNumber(StageTransforms[0]);

  return (
      <div style={style}>
				<div style={{position: 'relative', left: '0%', top:'0%', width: '100%', height: '100%'}}>
					<Img src={staticFile("assets/WorriedMom.svg")} style={{position: 'absolute', left: '20%', top: '15%', width: '80%', opacity: 1 - opacity }} />
					<AnimationEffect id="happy-mom">
					  <Img src={staticFile("assets/HappyMom.svg")} style={{position: 'absolute', left: '20%', top: '15%', width: '80%'}} />
					</AnimationEffect>
					<Img src={staticFile("assets/BabyUser.svg")} style={{position: 'absolute', left: '0%', top: '25%', width: '50%'}} />
				</div>
      </div>
  );
};