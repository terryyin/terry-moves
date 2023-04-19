import { Subtitle } from './Subtitles';
export type CurrentSubtitle = {
  allSubtitles: Subtitle[];
  globalFrame: number;
  globalFps: number;
  text: string;
  subtitle: Subtitle;
}
