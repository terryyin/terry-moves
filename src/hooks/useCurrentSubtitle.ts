import { CurrentSubtitle } from 'src/models/CurrentSubtitle';
import { Subtitle } from '../models/Subtitles';

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
