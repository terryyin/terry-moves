import * as THREE from 'three';
import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';

export type ThreeGroupAttributes = {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
}

export default class ThreeDGroupActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  static defaultValue: ThreeGroupAttributes = {
    scale: 1,
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
  };

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  combine(prev: ThreeGroupAttributes): ThreeGroupAttributes {
    const current = this.get3DGroupAttributes();
    return {
      scale: prev.scale * current.scale,
      position: prev.position.clone().add(current.position),
      rotation: new THREE.Euler(prev.rotation.x + current.rotation.x, prev.rotation.y + current.rotation.y, prev.rotation.z + current.rotation.z),
    }
  }

  private get3DGroupAttributes(): ThreeGroupAttributes {
    const translateY = this.getThreeTranslateY();
    const rotateY = this.getThreeRotateY();
    const scale = this.getThreeScale();

    return {
      position: new THREE.Vector3(0, translateY, 0),
      scale,
      rotation: new THREE.Euler(0, rotateY, 0),
    }
  }
 

  getThreeTranslateY(): number {
    switch(this.action.actionType) {
      case '3d rise':
        return this.effectCalculator.interpolateSpring([-4, 0]);
      default:
        return 0;
    }
  }

  getThreeRotateY(): number {
    switch(this.action.actionType) {
      case '3d rise':
        return this.effectCalculator.interpolateSpring([-Math.PI * 2, 0]);
      case '3d rotate':
        return this.effectCalculator.interpolateDuration([0, Math.PI * this.action.duration]);
      default:
        return 0;
    }
  }

  getThreeScale(): number {
    switch(this.action.actionType) {
      case '3d rise':
        return this.effectCalculator.getSpring();
      default:
        return 1;
    }
  }
}