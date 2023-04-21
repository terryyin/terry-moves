import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';

export default class ThreeDGroupActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  getThreeTranslateY(): number {
    switch(this.action.action) {
      case '3d rise':
        return this.effectCalculator.interpolateSpring([-4, 0]);
      default:
        return 0;
    }
  }

  getThreeRotateY(): number {
    switch(this.action.action) {
      case '3d rise':
        return this.effectCalculator.interpolateSpring([-Math.PI * 2, 0]);
      case '3d rotate':
        return this.effectCalculator.interpolateDuration([0, Math.PI * this.action.duration]);
      default:
        return 0;
    }
  }

  getThreeScale(): number {
    switch(this.action.action) {
      case '3d rise':
        return this.effectCalculator.getSpring();
      default:
        return 1;
    }
  }
}