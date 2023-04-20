import { Subtitle } from './Subtitles';
export type CurrentSubtitle = {
  allSubtitles: Subtitle[];
  globalFrame: number;
  globalFps: number;
}

export type CurrentSubtitle1 = {
  currentSubtitle: CurrentSubtitle;
  text: string;
  subtitle: Subtitle;
}
