import { SubtitleWithFlashBack } from './Subtitles';
import { CSSProperties } from 'react';
import { Action, Subtitle } from '@/models/Subtitles';
import { AnimationContext } from "./AnimationContext";
import DivActioner from './DivActioner';
import EffectCalculator from './EffectCalculator';
import ThreeDGroupActioner, { ThreeGroupAttributes } from './ThreeDGroupActioner';
import DivShadowActioner from './DivShadowActioner';
import GLBAnimationActioner, { GLBAnimationAttributes } from './GLBAnimationActioner';
import { Script } from './Script';


export default class AnimationContextWrapper {

  animationContext: AnimationContext;
  private currentSubtitle: Subtitle;
  private currentSubtitleEndTime: number;
  private script: Script;

  constructor(animationContext: AnimationContext, script: Script) {
    this.animationContext = animationContext;
    this.script = script;
    const { subtitle, endTime } = this.script.getSubtitleAndItsEndTimeAt(animationContext.globalFrame);
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

  private isSubtitleWithFlashBack(subtitle: Subtitle): subtitle is SubtitleWithFlashBack {
    return subtitle && (subtitle as SubtitleWithFlashBack).flashBack !== undefined;
  }

  private getActioner(actor: string): EffectCalculator[] {
    return this.script.getActioner(actor, this.adjustedFrame);
  }

  private get adjustedFrame(): number {
    if (this.isSubtitleWithFlashBack(this.currentSubtitle)) {
      const {flashBack} = this.currentSubtitle;
      const startTime = this.currentSubtitleEndTime - this.currentSubtitle.duration;
      const actualTimeWithInSubtitle = this.animationContext.globalFrame / this.animationContext.globalFps - startTime;
      if(actualTimeWithInSubtitle < flashBack.duration) {
        const resulttime = actualTimeWithInSubtitle * flashBack.speed + flashBack.from;
        return resulttime * this.animationContext.globalFps;
      }
    }
    return this.animationContext.globalFrame;
  }

  getCurrentSubtitleText() {
    const subtitle = this.currentSubtitle;
    const endTime = this.currentSubtitleEndTime;
    return {
      subtitle,
      text: (!subtitle) || (this.animationContext.globalFrame > (endTime) * this.animationContext.globalFps || this.animationContext.globalFrame < (endTime - subtitle.duration) * this.animationContext.globalFps) ? '' : subtitle.text,
    }
  }

};
