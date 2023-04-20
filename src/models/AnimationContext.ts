import { Subtitle } from './Subtitles';
export type AnimationContext = {
  allSubtitles: Subtitle[];
  globalFrame: number;
  globalFps: number;
}

export type CurrentSubtitle1 = {
  text: string;
  subtitle: Subtitle;
}
