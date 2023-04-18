import { CurrentSubtitle } from 'src/models/CurrentSubtitle';
import { Subtitle } from '../models/Subtitles';

export const useCurrentSubtitle = (subtitles: Subtitle[], frame: number, fps: number): CurrentSubtitle => {
  const currentSubtitle = subtitles.find(
    (subtitle) =>
      frame >= subtitle.startTime * fps && frame <= subtitle.endTime * fps
  );

  if (currentSubtitle === undefined) {
    throw new Error('No subtitle found for current frame');
  }

  return {
    globalFps: fps,
    globalFrame: frame,
    subtitle: currentSubtitle,
    text: currentSubtitle.text,
  }
};
