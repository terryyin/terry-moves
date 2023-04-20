import { AnimationContext } from '@/models/AnimationContext';
import { Subtitle } from '../models/Subtitles';
import { interpolate } from 'remotion';
import { ReactNode, createContext, useContext } from 'react';
import AnimationContextWrapper from '../models/AnimationContextWrapper';

const AnimationContextContext = createContext<AnimationContext | undefined>(undefined);

interface AnimationContextProviderProps {
  children: ReactNode;
  value: AnimationContext;
}

export function AnimationContextProvider({ children, value }: AnimationContextProviderProps) {
  return <AnimationContextContext.Provider value={value}>{children}</AnimationContextContext.Provider>;
}

export function useAnimationContext(): AnimationContextWrapper {
  const context = useContext(AnimationContextContext);
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider');
  }
  return new AnimationContextWrapper(context);
}

export interface StageTransform {
	subtitleId: string;
	durationInSeconds: number;
  outputRange: number[];
}

export const getStartTimeOfSubtitle = (subtitleId: string, subtitles: Subtitle[]): number => {
  let endTime = 0;
  let targetSubtitle: Subtitle = subtitles[0];

  for (let i = 0; i < subtitles.length; i++) {
    targetSubtitle = subtitles[i];
    endTime += targetSubtitle.leadingBlank + targetSubtitle.duration;
    if (subtitleId === targetSubtitle.id)
      break;
  }

  return endTime - targetSubtitle.duration;
}

const interpolateStage = (stageTransforms: StageTransform[], animationContext: AnimationContext) => {
	const stageTransform = stageTransforms[0];
	if(!stageTransform) throw new Error("No stage transform found");

	const startTime = getStartTimeOfSubtitle(stageTransform.subtitleId, animationContext.allSubtitles);
	return interpolate(animationContext.globalFrame, [startTime * animationContext.globalFps, (startTime + stageTransform.durationInSeconds) * animationContext.globalFps], stageTransform.outputRange, {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
}

export const useCurrentStage = interpolateStage;
