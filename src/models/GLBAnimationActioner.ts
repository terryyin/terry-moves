import { Action, ThreeDAnimationAction } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';

export type GLBAnimationAttributes = {
  playing: boolean;
  time?: number;
  loopOnce: boolean;
}

export default class GLBAnimationActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  static defaultValue: GLBAnimationAttributes = {
    playing: true,
    loopOnce: false,
  };

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  combine(prev: GLBAnimationAttributes): GLBAnimationAttributes {
    const current = this.getCurrentValue();
    return {
      playing: current.time!==undefined ||  prev.time !== undefined,
      time: current.time ?? prev.time,
      loopOnce: current.loopOnce,
    }
  }

  private getCurrentValue(): GLBAnimationAttributes {
    switch(this.action.actionType) {
      case '3d animation start':
        return  this.getAnimationAttributes(this.action);
      case '3d animation reverse':
        return this.getReverseAnimationAttributes(this.action);
      default:
        return { ...GLBAnimationActioner.defaultValue};
    }
  }

  private getReverseAnimationAttributes(action: ThreeDAnimationAction): GLBAnimationAttributes {
    const {time, ...rest} = this.getAnimationAttributes(action);
    if(time === undefined) return { ...rest}
    return { ...rest, time: this.action.duration - time}
  }

  private getAnimationAttributes(action: ThreeDAnimationAction): GLBAnimationAttributes {
    return { 
      playing: this.effectCalculator.withInDuration(),
      time: this.getAnimationTime(action),
      loopOnce: true,
    }
  }

  private getAnimationTime(action: ThreeDAnimationAction): number | undefined {
    const percentage = action.percentage ?? 100;
    if (this.effectCalculator.withInDuration()) {
     return this.effectCalculator.timeWithIn() * percentage / 100 * action.speed
    }

    if (this.effectCalculator.isAfter() && action.pauseAtEnd) {
      return action.duration * percentage / 100 * action.speed;
    }

    if (action.freezeBeforeStart) {
      return 0;
    }
  }

}
