import React, { CSSProperties } from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const CustomerGroup: React.FC<{style?: CSSProperties, happySince: number}> = ({ style, happySince }) => {
	const frame = useCurrentFrame();
  // Const { fps } = useVideoConfig();
	const transitionDuration = 90;
	const opacity = interpolate(frame, [happySince, happySince + transitionDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });


  return (
      <div style={style}>
				<div style={{position: 'relative', left: '0%', top:'0%', width: '100%', height: '100%'}}>
					<Img src={staticFile("assets/WorriedMom.svg")} style={{position: 'absolute', left: '20%', top: '15%', width: '80%', opacity: 1 - opacity }} />
					<Img src={staticFile("assets/HappyMom.svg")} style={{position: 'absolute', left: '20%', top: '15%', width: '80%', opacity}} />
					<Img src={staticFile("assets/BabyUser.svg")} style={{position: 'absolute', left: '0%', top: '25%', width: '50%'}} />
				</div>
      </div>
  );
};