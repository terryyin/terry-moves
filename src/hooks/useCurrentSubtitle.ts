import { CurrentSubtitle } from '@/models/CurrentSubtitle';
import { Subtitle } from '../models/Subtitles';
import { interpolate } from 'remotion';

export const useCurrentSubtitle = (subtitles: Subtitle[], frame: number, fps: number): CurrentSubtitle => {
  let i = 0;
  for (; i < subtitles.length; i++) {
    if (subtitles[i].startTime * fps > frame)
      break;
  }
  const subtitle = i === 0 ? subtitles[0] : subtitles[i - 1];
  return {
    allSubtitles: subtitles,
    globalFps: fps,
    globalFrame: frame,
    subtitle,
    text: frame > subtitle.endTime * fps || frame < subtitle.startTime * fps ? '' : subtitle.text,
  };
};


export interface StageTransform {
	subtitleId: string;
	durationInSeconds: number;
  outputRange: number[];
}

export const useCurrentStage = (stageTransforms: StageTransform[], currentSubtitle: CurrentSubtitle) => {
	const stageTransform = stageTransforms[0];
	if(!stageTransform) throw new Error("No stage transform found");
	const targetSubtitleId = stageTransform.subtitleId;
  const targetSubtitle = currentSubtitle.allSubtitles.find((subtitle) => subtitle.id === targetSubtitleId);
	if(!targetSubtitle) throw new Error(`No target subtitle found: ${targetSubtitleId}`);

	const targetTime = targetSubtitle.startTime;
	return interpolate(currentSubtitle.globalFrame, [targetTime * currentSubtitle.globalFps, (targetTime + stageTransform.durationInSeconds) * currentSubtitle.globalFps], stageTransform.outputRange, {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
}
