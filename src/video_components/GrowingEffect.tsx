import {interpolate} from 'remotion';
import React, {CSSProperties} from 'react';
import { useAnimationContext } from '../hooks/useAnimationContext';

export const GrowingEffect: React.FC<{children: React.ReactNode, startSubtitleId: string}> = ({
  children, startSubtitleId}) => {
  const animationContextWrapper = useAnimationContext();
  const progress = animationContextWrapper.getSpring(startSubtitleId);

  // Map progress from 0 to 1 to size from 100% to 110%
  const size = interpolate(progress, [0, 1], [100, 120]);

  const style: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
  };

  return <>
    {size !== 100 && <div style={{ ...style, transform: `scale(${size / 100})`, transformOrigin: 'center', opacity: `${1 - progress}` }}>{children}</div>}
    <div style={style}>{children}</div>
  </>;
};
