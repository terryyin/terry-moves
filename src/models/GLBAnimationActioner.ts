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
      playing: current.playing,
      time: current.time ?? prev.time,
      loopOnce: current.loopOnce,
    }
  }

  private getCurrentValue(): GLBAnimationAttributes {
    switch(this.action.actionType) {
      case '3d animation start':
        return  this.getAnimationAttributes(this.action as ThreeDAnimationAction);
      default:
        return { ...GLBAnimationActioner.defaultValue};
    }
  }

  private getAnimationAttributes(action: ThreeDAnimationAction): GLBAnimationAttributes {
    return { 
      playing: this.effectCalculator.withInDuration(),
      time: this.effectCalculator.withInDuration() ? this.effectCalculator.timeWithIn() * action.speed : undefined,
      loopOnce: true,
    }
  }

}
