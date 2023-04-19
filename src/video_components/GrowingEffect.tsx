import {interpolate, spring} from 'remotion';
import React, {CSSProperties} from 'react';
import { CurrentSubtitle } from '../models/CurrentSubtitle';
import { getStartTimeOfSubtitle } from '../hooks/useCurrentSubtitle';

export const GrowingEffect: React.FC<{children: React.ReactNode, currentSubtitle: CurrentSubtitle, startSubtitleId: string}> = ({
  children, currentSubtitle, startSubtitleId}) => {
  const progress = spring({
    frame: currentSubtitle.globalFrame - getStartTimeOfSubtitle(startSubtitleId, currentSubtitle.allSubtitles) * currentSubtitle.globalFps,
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
