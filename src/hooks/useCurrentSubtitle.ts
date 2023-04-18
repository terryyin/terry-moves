import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitle } from '../models/Subtitles';

export const useCurrentSubtitle = (subtitles: Subtitle[]): Subtitle | null => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSubtitle = subtitles.find(
    (subtitle) =>
      frame >= subtitle.startTime * fps && frame <= subtitle.endTime * fps
  );

  return currentSubtitle || null;
};
