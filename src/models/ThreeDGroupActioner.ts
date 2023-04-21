import { Euler, Vector3 } from '@react-three/fiber';
import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';

export type ThreeGroupAttributes = {
  scale: number;
  position: Vector3;
  rotation: Euler;
}

export default class ThreeDGroupActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  static defaultValue: ThreeGroupAttributes = {
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  };

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  get3DGroupAttributes(): ThreeGroupAttributes {
    const translateY = this.getThreeTranslateY();
    const rotateY = this.getThreeRotateY();
    const scale = this.getThreeScale();

    return {
      position: [0, translateY, 0],
      scale,
      rotation: [0, rotateY, 0],
    }
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