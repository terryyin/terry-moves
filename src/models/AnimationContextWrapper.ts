import { CSSProperties } from 'react';
import {spring} from 'remotion'
import {interpolate} from 'remotion'
import { Action, Subtitle } from '@/models/Subtitles';
import { StageTransform } from "@/hooks/useAnimationContext";
import { AnimationContext } from "./AnimationContext";
import Actioner from './Actioner';


export default class AnimationContextWrapper {

  animationContext: AnimationContext;

  constructor(animationContext: AnimationContext) {
    this.animationContext = animationContext;
  }

  getStyleOf(objectId: string): CSSProperties {
    const subtitle = this.animationContext.allSubtitles.find(subtitle => subtitle.actions?.find(action => action.objectId === objectId));
    let action: Action | undefined;
    if(subtitle?.actions) {
      action = subtitle.actions.find(action => action.objectId === objectId);
    }

    const actioner = new Actioner(subtitle, action, this);
    return actioner.getStyle();
  }

  interpolate1(startTime: number, durationInSeconds: number, outputRange: number[]): number {
    return interpolate(this.animationContext.globalFrame, [startTime * this.animationContext.globalFps, (startTime + durationInSeconds) * this.animationContext.globalFps], outputRange, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  getStartTimeOfSubtitle(subtitleId: string): number {
    let endTime = 0;
    let targetSubtitle: Subtitle = this.animationContext.allSubtitles[0];
    for (let i = 0; i < this.animationContext.allSubtitles.length; i++) {
      targetSubtitle = this.animationContext.allSubtitles[i];
      endTime += targetSubtitle.leadingBlank + targetSubtitle.duration;
      if (subtitleId === targetSubtitle.id)
        break;
    }
    return endTime - targetSubtitle.duration;
  }

  getNumber({ subtitleId, durationInSeconds, outputRange }: StageTransform): number {
    const startTime = this.getStartTimeOfSubtitle(subtitleId);
    return this.interpolate1(startTime, durationInSeconds, outputRange);
  }

  getSpring(startSubtitleId: string) {
    return spring({
      frame: this.animationContext.globalFrame - this.getStartTimeOfSubtitle(startSubtitleId) * this.animationContext.globalFps,
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
    const startTime = this.getStartTimeOfSubtitle(subtitleId);
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

