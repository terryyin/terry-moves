import {spring} from 'remotion'
import {interpolate} from 'remotion'
import { Subtitle } from '@/models/Subtitles';
import { StageTransform } from "@/hooks/useAnimationContext";
import { AnimationContext } from "./AnimationContext";

export const getStartTimeOfSubtitle = (subtitleId: string, subtitles: Subtitle[]): number => {
  let endTime = 0;
  let targetSubtitle: Subtitle = subtitles[0];

  for (let i = 0; i < subtitles.length; i++) {
    targetSubtitle = subtitles[i];
    endTime += targetSubtitle.leadingBlank + targetSubtitle.duration;
    if (subtitleId === targetSubtitle.id)
      break;
  }

  return endTime - targetSubtitle.duration;
}

export default class AnimationContextWrapper {

  animationContext: AnimationContext;

  constructor(animationContext: AnimationContext) {
    this.animationContext = animationContext;
  }

  getScaleOf(objectId: string): number {
    const subtitle = this.animationContext.allSubtitles[0];
    if(!subtitle.actions) return 100;
    const action = subtitle.actions[0];
    return this.interpolate1(subtitle.leadingBlank, action.duration, action.outputRange);
  }

  private interpolate1(startTime: number, durationInSeconds: number, outputRange: number[]): number {
    return interpolate(this.animationContext.globalFrame, [startTime * this.animationContext.globalFps, (startTime + durationInSeconds) * this.animationContext.globalFps], outputRange, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  getNumber({ subtitleId, durationInSeconds, outputRange }: StageTransform): number {
    const startTime = getStartTimeOfSubtitle(subtitleId, this.animationContext.allSubtitles);
    return this.interpolate1(startTime, durationInSeconds, outputRange);
  }

  getSpring(startSubtitleId: string) {
    return spring({
      frame: this.animationContext.globalFrame - getStartTimeOfSubtitle(startSubtitleId, this.animationContext.allSubtitles) * this.animationContext.globalFps,
      durationInFrames: 60,
      fps: 30,
      config: {
        damping: 50,
        mass: 0.5,
        stiffness: 200,
        overshootClamping: true,
      },
    });
  }

  sinceSubtitle(subtitleId: string): boolean {
    const startTime = getStartTimeOfSubtitle(subtitleId, this.animationContext.allSubtitles);
    return this.animationContext.globalFrame >= startTime * this.animationContext.globalFps;
  }

  getCurrentSubtitleText(): string {
    let endTime = 0;
    let subtitle: Subtitle = this.animationContext.allSubtitles[0];

    for (let i = 0; i < this.animationContext.allSubtitles.length; i++) {
      subtitle = this.animationContext.allSubtitles[i];
      endTime += subtitle.leadingBlank + subtitle.duration;
      if (endTime * this.animationContext.globalFps > this.animationContext.globalFrame)
        break;
    }

    return this.animationContext.globalFrame > (endTime) * this.animationContext.globalFps || this.animationContext.globalFrame < (endTime - subtitle.duration) * this.animationContext.globalFps ? '' : subtitle.text;
  }
};

