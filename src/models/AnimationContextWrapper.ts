import { SubtitleWithFlashBack } from './Subtitles';
import { Action, Subtitle } from '@/models/Subtitles';
import DivActioner from './DivActioner';
import { EffectCalculatorAndAction } from './EffectCalculator';
import GLBAnimationActioner, { GLBAnimationAttributes } from './GLBAnimationActioner';
import { Script } from './Script';
import { TextReveal } from './LazyTransitions';
import { ThreeDObjectState } from "./ThreeDObjectState";
import CodeActioner, { CodeTransformation } from './CodeActioner';
import GeneralActioner from './GeneralActioner';


export default class AnimationContextWrapper {

  private currentSubtitle: Subtitle;
  private currentSubtitleEndTime: number;
  private script: Script;
  private frame: number;

  constructor(frame: number, script: Script) {
    this.frame = frame;
    this.script = script;
    const { subtitle, endTime } = this.script.getSubtitleAndItsEndTimeAt(frame);
    this.currentSubtitle = subtitle;
    this.currentSubtitleEndTime = endTime;
  }

  getGLBAnimationAttributes(actor: string): GLBAnimationAttributes {
    const result = this.getActioner(actor)
      .map(effectCalculator => new GLBAnimationActioner(effectCalculator.action as Action, effectCalculator.effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), { ...GLBAnimationActioner.defaultValue});
    result.time = result.time ?? this.adjustedFrame / this.script.fps;
    return result;
  }

  get3DObjectStateOf(actor: string): ThreeDObjectState {
    return this.getActioner(actor)
      .map(effectCalculator => new DivActioner(effectCalculator.action as Action, effectCalculator.effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), DivActioner.defaultValue)
      .get3DObjedctState(this.adjustedFrame, this.script.fps);
  }

  getTextReveal(actor: string): TextReveal {
    return this.getActioner(actor)
      .map(effectCalculator => new DivActioner(effectCalculator.action as Action, effectCalculator.effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), DivActioner.defaultValue)
      .getTextReveal(this.adjustedFrame, this.script.fps);
  }

  getCodeTransfomation(actor: string): CodeTransformation {
     return this.getActioner(actor)
      .map(effectCalculator => new CodeActioner(effectCalculator.action as Action, effectCalculator.effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), CodeActioner.defaultValue)
      .getCodeTransfomation(this.adjustedFrame, this.script.fps);
  }

  getGeneralValue(actor: string): ThreeDObjectState {
     return this.getActioner(actor)
      .map(effectCalculator => new GeneralActioner(effectCalculator.action as Action, effectCalculator.effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), GeneralActioner.defaultValue)
      .get3DObjedctState(this.adjustedFrame, this.script.fps);
  }

  private isSubtitleWithFlashBack(subtitle: Subtitle): subtitle is SubtitleWithFlashBack {
    return subtitle && (subtitle as SubtitleWithFlashBack).flashBack !== undefined;
  }

  private getActioner(actor: string): EffectCalculatorAndAction[] {
    return this.script.getActioner(actor, this.adjustedFrame);
  }

  private get adjustedFrame(): number {
    if (this.isSubtitleWithFlashBack(this.currentSubtitle)) {
      const {flashBack} = this.currentSubtitle;
      const startTime = this.currentSubtitleEndTime - this.currentSubtitle.duration;
      const actualTimeWithInSubtitle = this.frame / this.script.fps - startTime;
      if(actualTimeWithInSubtitle < flashBack.duration) {
        const resulttime = actualTimeWithInSubtitle * flashBack.speed + flashBack.from;
        return resulttime * this.script.fps;
      }
    }
    return this.frame;
  }

  getCurrentSubtitleText() {
    const subtitle = this.currentSubtitle;
    const endTime = this.currentSubtitleEndTime;
    return {
      subtitle,
      text: (!subtitle) || (this.frame > (endTime) * this.script.fps || this.frame < (endTime - subtitle.duration) * this.script.fps) ? '' : subtitle.text,
    }
  }

};
