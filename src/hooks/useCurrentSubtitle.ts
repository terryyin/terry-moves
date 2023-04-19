import { CurrentSubtitle } from '@/models/CurrentSubtitle';
import { Subtitle } from '../models/Subtitles';
import { interpolate } from 'remotion';

export const useCurrentSubtitle1 = (subtitles: Subtitle[], frame: number, fps: number): CurrentSubtitle => {

  let endTime = 0;
  let subtitle: Subtitle = subtitles[0];

  for (let i = 0; i < subtitles.length; i++) {
    subtitle = subtitles[i];
    endTime += subtitles[i].leadingBlank! + subtitles[i].duration!;
    if (endTime * fps > frame)
      break;
  }


  return {
    allSubtitles: subtitles,
    globalFps: fps,
    globalFrame: frame,
    subtitle,
    text: frame > (endTime) * fps || frame < (endTime - subtitle.duration!) * fps ? '' : subtitle.text,
  };
};


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
  let endTime = 0;
  let targetSubtitle: Subtitle = currentSubtitle.allSubtitles[0];

  for (let i = 0; i < currentSubtitle.allSubtitles.length; i++) {
    targetSubtitle = currentSubtitle.allSubtitles[i];
    endTime += targetSubtitle.leadingBlank! + targetSubtitle.duration!;
    if (stageTransform.subtitleId === targetSubtitle.id)
      break;
  }

	const targetTime = endTime - targetSubtitle.duration!;
	return interpolate(currentSubtitle.globalFrame, [targetTime * currentSubtitle.globalFps, (targetTime + stageTransform.durationInSeconds) * currentSubtitle.globalFps], stageTransform.outputRange, {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
}
