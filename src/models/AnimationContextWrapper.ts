import { CSSProperties } from 'react';
import { Action, Subtitle } from '@/models/Subtitles';
import { AnimationContext } from "./AnimationContext";
import DivActioner from './DivActioner';
import EffectCalculator from './EffectCalculator';
import ThreeDGroupActioner, { ThreeGroupAttributes } from './ThreeDGroupActioner';
import DivShadowActioner from './DivShadowActioner';
import GLBAnimationActioner, { GLBAnimationAttributes } from './GLBAnimationActioner';

export default class AnimationContextWrapper {

  animationContext: AnimationContext;
  private currentSubtitle: Subtitle;
  private currentSubtitleEndTime: number;

  constructor(animationContext: AnimationContext) {
    this.animationContext = animationContext;
    const { subtitle, endTime } = this.getCurrentSubtitleAndItsEndTime();
    this.currentSubtitle = subtitle;
    this.currentSubtitleEndTime = endTime;
  }

  getGLBAnimationAttributes(actor: string): GLBAnimationAttributes {
    const result = this.getActioner(actor)
      .map(effectCalculator => new GLBAnimationActioner(effectCalculator.action as Action, effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), { ...GLBAnimationActioner.defaultValue});
    result.time = result.time ?? this.adjustedFrame / this.animationContext.globalFps;
    return result;
  }

  getStyleOf(actor: string): CSSProperties {
    return this.getActioner(actor)
      .map(effectCalculator => new DivActioner(effectCalculator.action as Action, effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), DivActioner.defaultValue)
      .getStyle(this.adjustedFrame);
  }

  getShadowStyleOf(actor: string): CSSProperties | undefined {
    return this.getActioner(actor)
      .map(effectCalculator => new DivShadowActioner(effectCalculator.action as Action, effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), DivActioner.defaultValue)
      .getStylePresence(this.adjustedFrame);
  }

  get3DGroupAttributes(actor: string): ThreeGroupAttributes {
    return this.getActioner(actor)
      .map(effectCalculator => new ThreeDGroupActioner(effectCalculator.action as Action, effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), ThreeDGroupActioner.defaultValue);
  }

  private getActioner(actor: string): EffectCalculator[] {
    return this.animationContext.allSubtitles.map((subtitle, index) => {
      if(!subtitle?.actions) return [];
      return subtitle.actions
        .filter(action => action.actor === actor)
        .map(action => {
          const startTime = subtitle ? this.getStartTimeOfSubtitle(index) : 0; 
          return new EffectCalculator(action, startTime, this.adjustedFrame, this.animationContext.globalFps);
        });
    }).flat();
  }

  private get adjustedFrame(): number {
    return this.animationContext.globalFrame;
  }

  private getStartTimeOfSubtitle(subtitleIndex: number): number {
    let endTime = 0;
    let targetSubtitle: Subtitle = this.animationContext.allSubtitles[0];
    for (let i = 0; i < this.animationContext.allSubtitles.length; i++) {
      targetSubtitle = this.animationContext.allSubtitles[i];
      endTime += targetSubtitle.leadingBlank + targetSubtitle.duration;
      if (subtitleIndex === i)
        break;
    }
    return endTime - targetSubtitle.duration;
  }

  private getCurrentSubtitleAndItsEndTime() {
    let endTime = 0;
    let subtitle: Subtitle = this.animationContext.allSubtitles[0];

    for (let i = 0; i < this.animationContext.allSubtitles.length; i++) {
      subtitle = this.animationContext.allSubtitles[i];
      endTime += subtitle.leadingBlank + subtitle.duration;
      if (endTime * this.animationContext.globalFps > this.animationContext.globalFrame)
        break;
    }

    return { subtitle, endTime }
  }

  getCurrentSubtitleText(): string {
    const subtitle = this.currentSubtitle;
    const endTime = this.currentSubtitleEndTime;
    return this.animationContext.globalFrame > (endTime) * this.animationContext.globalFps || this.animationContext.globalFrame < (endTime - subtitle.duration) * this.animationContext.globalFps ? '' : subtitle.text;
  }

};
