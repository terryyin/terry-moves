import {interpolate, spring} from 'remotion';
import React, {CSSProperties} from 'react';
import { getStartTimeOfSubtitle, useAnimationContext } from '../hooks/useCurrentSubtitle';

export const GrowingEffect: React.FC<{children: React.ReactNode, startSubtitleId: string}> = ({
  children, startSubtitleId}) => {
  const {animationContext} = useAnimationContext();
  const progress = spring({
    frame: animationContext.globalFrame - getStartTimeOfSubtitle(startSubtitleId, animationContext.allSubtitles) * animationContext.globalFps,
    durationInFrames: 60,
    fps: 30,
    config: {
      damping: 50,
      mass: 0.5,
      stiffness: 200,
      overshootClamping: true,
    },
  });

  // Map progress from 0 to 1 to size from 100% to 110%
  const size = interpolate(progress, [0, 1], [100, 120]);

  const style: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
  };

  return <div style={style}>
    <div style={{ ...style, transform: `scale(${size / 100})`, transformOrigin: 'center', opacity: `${1 - progress}` }}>{children}</div>
    <div style={style}>{children}</div>
  </div>;
};
