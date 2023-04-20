import {interpolate} from 'remotion'
import { Subtitle } from '@/models/Subtitles';
import { StageTransform } from "@/hooks/useCurrentSubtitle";
import { AnimationContext } from "./AnimationContext";

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

export default class AnimationContextWrapper {
  animationContext: AnimationContext;

  constructor(animationContext: AnimationContext) {
    this.animationContext = animationContext;
  }

  getNumber(StageTransforms: StageTransform[]): number {
    return interpolateStage(StageTransforms, this.animationContext);
  }

  sinceSubtitle(subtitleId: string): boolean {
    const startTime = getStartTimeOfSubtitle(subtitleId, this.animationContext.allSubtitles);
    return this.animationContext.globalFrame >= startTime * this.animationContext.globalFps;
  }
}

