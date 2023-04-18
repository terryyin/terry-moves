import { Subtitle } from './Subtitles';
export interface CurrentSubtitle {
  allSubtitles: Subtitle[];
  globalFrame: number;
  globalFps: number;
  text: string;
  subtitle: Subtitle;
}
