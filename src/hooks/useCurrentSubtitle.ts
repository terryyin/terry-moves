import { AnimationContext, CurrentSubtitle1 } from '@/models/AnimationContext';
import { Subtitle } from '../models/Subtitles';
import { interpolate } from 'remotion';

export const useCurrentSubtitle1 = (subtitles: Subtitle[], frame: number, fps: number): CurrentSubtitle1 => {
  let endTime = 0;
  let subtitle: Subtitle = subtitles[0];

  for (let i = 0; i < subtitles.length; i++) {
    subtitle = subtitles[i];
    endTime += subtitles[i].leadingBlank + subtitles[i].duration;
    if (endTime * fps > frame)
      break;
  }

  return {
    subtitle,
    text: frame > (endTime) * fps || frame < (endTime - subtitle.duration) * fps ? '' : subtitle.text,
  };
};

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

const interpolateStage = (stageTransforms: StageTransform[], currentSubtitle: AnimationContext) => {
	const stageTransform = stageTransforms[0];
	if(!stageTransform) throw new Error("No stage transform found");

	const startTime = getStartTimeOfSubtitle(stageTransform.subtitleId, currentSubtitle.allSubtitles);
	return interpolate(currentSubtitle.globalFrame, [startTime * currentSubtitle.globalFps, (startTime + stageTransform.durationInSeconds) * currentSubtitle.globalFps], stageTransform.outputRange, {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
}

export const useCurrentStage = interpolateStage;

export const sinceSubtitle = (currentSubtitle: AnimationContext, subtitleId: string): boolean => {
	const startTime = getStartTimeOfSubtitle(subtitleId, currentSubtitle.allSubtitles);
  return currentSubtitle.globalFrame >= startTime * currentSubtitle.globalFps;
}