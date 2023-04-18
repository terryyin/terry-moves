import { Subtitle } from './Subtitles';
export interface CurrentSubtitle {
  globalFrame: number;
  globalFps: number;
  text: string;
  subtitle: Subtitle;
}
