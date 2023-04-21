import { CSSProperties } from 'react';
import {spring} from 'remotion'
import { Action, Subtitle } from '@/models/Subtitles';
import { AnimationContext } from "./AnimationContext";
import DivActioner from './DivActioner';
import EffectCalculator from './EffectCalculator';
import ThreeDGroupActioner, { ThreeGroupAttributes } from './ThreeDGroupActioner';

export default class AnimationContextWrapper {

  animationContext: AnimationContext;

  constructor(animationContext: AnimationContext) {
    this.animationContext = animationContext;
  }

  private getActioner(objectId: string): EffectCalculator[] {
    return this.animationContext.allSubtitles.map(subtitle => {
      if(!subtitle?.actions) return [];
      return subtitle.actions
        .filter(action => action.objectId === objectId)
        .map(action => {
          const startTime = subtitle ? this.getStartTimeOfSubtitle(subtitle.id) : 0; 
          return new EffectCalculator(action, startTime, this.animationContext.globalFrame, this.animationContext.globalFps);
        });
    }).flat();
  }

  getStyleOf(objectId: string): CSSProperties {
    const effectCalculators = this.getActioner(objectId);
    if(effectCalculators.length === 0) return {};
    const actioner = new DivActioner(effectCalculators[0].action as Action, effectCalculators[0]);
    return actioner.getStyle();
  }

  get3DGroupAttributes(objectId: string): ThreeGroupAttributes {
    return this.getActioner(objectId)
      .map(effectCalculator => new ThreeDGroupActioner(effectCalculator.action as Action, effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), ThreeDGroupActioner.defaultValue);
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

