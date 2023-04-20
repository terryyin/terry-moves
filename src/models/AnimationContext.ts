import { Subtitle } from './Subtitles';
export type AnimationContext = {
  allSubtitles: Subtitle[];
  globalFrame: number;
  globalFps: number;
}
