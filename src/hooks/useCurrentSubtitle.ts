import { Subtitle } from '../models/Subtitles';

export const useCurrentSubtitle = (subtitles: Subtitle[], frame: number, fps: number): Subtitle => {
  const currentSubtitle = subtitles.find(
    (subtitle) =>
      frame >= subtitle.startTime * fps && frame <= subtitle.endTime * fps
  );

  if (currentSubtitle === undefined) {
    throw new Error('No subtitle found for current frame');
  }

  return currentSubtitle;
};
