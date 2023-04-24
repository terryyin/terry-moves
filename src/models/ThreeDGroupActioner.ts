import { ThreeDRotateAction, ThreeDUnitAction } from './Subtitles';
import * as THREE from 'three';
import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';
import { toVector3 } from './DivActioner';

export type ThreeGroupAttributes = {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  lookAtYd: number;
  cameraDistanceD: number;
}

export default class ThreeDGroupActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  static defaultValue: ThreeGroupAttributes = {
    scale: 1,
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    lookAtYd: 0,
    cameraDistanceD: 0,
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
      lookAtYd: current.lookAtYd + prev.lookAtYd,
      cameraDistanceD: current.cameraDistanceD + prev.cameraDistanceD,
    }
  }

  private get3DGroupAttributes(): ThreeGroupAttributes {
    const translateY = this.getThreeTranslateY();
    const rotateY = this.getThreeRotateY();
    const scale = this.getThreeScale();
    const lookAtYd = this.getLookAtYd();
    const cameraDistanceD = this.getCameraDistanceD();

    return {
      position: new THREE.Vector3(0, translateY, 0),
      scale,
      rotation: new THREE.Euler(0, rotateY, 0),
      lookAtYd,
      cameraDistanceD,
    }
  }
 

  private getThreeTranslateY(): number {
    switch(this.action.actionType) {
      case '3d rise':
        return this.effectCalculator.interpolateSpring([-4, 0]);
      case '3d going up':
        return this.effectCalculator.interpolateSpring([0, toVector3(this.action.distances)[1]]);
      case '3d ocillating':
        return this.getOcillatingY(this.action as ThreeDUnitAction);
      default:
        return 0;
    }
  }

  private getOcillatingY(action: ThreeDUnitAction): number {
    if (!this.effectCalculator.withInDuration()) {
      return 0;
    }
    return -Math.sin(this.effectCalculator.timeWithIn() * Math.PI * 2) * toVector3(action.distances)[1];
  }

  private getCameraDistanceD(): number {
    switch(this.action.actionType) {
      case '3d camera closer':
        return this.effectCalculator.interpolateSpring([0, this.action.distance]);
      default:
        return 0;
    }
  }

  private getLookAtYd(): number {
    switch(this.action.actionType) {
      case '3d camera move':
        return this.effectCalculator.interpolateSpring([0, toVector3(this.action.distances)[1]]);
      default:
        return 0;
    }
  }

  private getThreeRotateY(): number {
    switch(this.action.actionType) {
      case '3d rise':
        return this.effectCalculator.interpolateSpring([-Math.PI * 2, 0]);
      case '3d rotate':
        return this.effectCalculator.interpolateDuration([0, Math.PI * (this.action as ThreeDRotateAction).totalRotation / 180]);
      default:
        return 0;
    }
  }

  private getThreeScale(): number {
    switch(this.action.actionType) {
      case '3d rise':
        return this.effectCalculator.getSpring();
      default:
        return 1;
    }
  }
}
