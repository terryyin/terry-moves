import {Composition} from 'remotion'
import { AnimationContextProvider } from '../hooks/useAnimationContext';
import { Subtitle } from '../models/Subtitles';
import autonomousComponent from './autonomousComponent';
import React from 'react';
import AnimationContextWrapper from '../models/AnimationContextWrapper';

export const Story: React.FC<{id: string, subtitles: Subtitle[], children: React.ReactNode}> = (({subtitles, id, children}) => {
  const InnerStory = autonomousComponent(({frame, fps}) => {
    const animationContext  = {
      allSubtitles: subtitles,
      globalFps: fps,
      globalFrame: frame,
    };
    const animationContextWrapper = new AnimationContextWrapper(animationContext);

    return (
      <AnimationContextProvider value={animationContextWrapper}>
        {children}
      </AnimationContextProvider>
    );
  });

  return <Composition
    id={ id }
    component={ InnerStory }
    durationInFrames={40*30}
    fps={30}
    width={1280}
    height={720}
    />
});
