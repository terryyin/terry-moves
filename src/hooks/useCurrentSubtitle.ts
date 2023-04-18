import { CurrentSubtitle } from 'src/models/CurrentSubtitle';
import { Subtitle } from '../models/Subtitles';
import { interpolate } from 'remotion';

export const useCurrentSubtitle = (subtitles: Subtitle[], frame: number, fps: number): CurrentSubtitle => {
  for (let i = 0; i < subtitles.length; i++) {
    const subtitle = subtitles[i];
    if (frame >= subtitle.startTime * fps) {
      return {
        globalFps: fps,
        globalFrame: frame,
        subtitle,
        text: frame > subtitle.endTime * fps ? '' : subtitle.text,
      };
    }
  }

  return {
    globalFps: fps,
    globalFrame: frame,
    subtitle: subtitles[0],
    text: ''
  }
};

export interface StageTransform {
	subtitleId: string;
	durationInSeconds: number;
}

export const useCurrentStage = (subtitles: Subtitle[], stageTransforms: StageTransform[], frame: number, fps: number) => {
	const stageTransform = stageTransforms[0];
	if(!stageTransform) throw new Error("No stage transform found");
	const targetSubtitleId = stageTransform.subtitleId;
  const targetSubtitle = subtitles.find((subtitle) => subtitle.id === targetSubtitleId);
	if(!targetSubtitle) throw new Error("No target subtitle found");

	const targetTime = targetSubtitle.startTime;
	return interpolate(frame, [targetTime * fps, (targetTime + stageTransform.durationInSeconds) * fps], [100, 50], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
}
