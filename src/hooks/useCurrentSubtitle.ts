import { Subtitle } from '../models/Subtitles';

export const useCurrentSubtitle = (subtitles: Subtitle[], frame: number, fps: number): Subtitle | null => {
  const currentSubtitle = subtitles.find(
    (subtitle) =>
      frame >= subtitle.startTime * fps && frame <= subtitle.endTime * fps
  );

  return currentSubtitle || null;
};
