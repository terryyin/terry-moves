import { ThreeDRotateAction } from './Subtitles';
import * as THREE from 'three';
import { toVector3 } from './DivActioner';
import LazyTransitions from './LazyTransitions';
import DivBaseActioner from './DivBaseActioner';

export type ThreeGroupAttributesOld = {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  lookAtYd: number;
  cameraDistanceD: number;
}

const combineOld = (prev: ThreeGroupAttributesOld, current: ThreeGroupAttributesOld): ThreeGroupAttributesOld =>{
  return {
    scale: prev.scale * current.scale,
    position: prev.position.clone().add(current.position),
    rotation: new THREE.Euler(prev.rotation.x + current.rotation.x, prev.rotation.y + current.rotation.y, prev.rotation.z + current.rotation.z),
    lookAtYd: current.lookAtYd + prev.lookAtYd,
    cameraDistanceD: current.cameraDistanceD + prev.cameraDistanceD,
  }
};

class ThreeGroupAttributes {
  lazyTransitions: LazyTransitions;
  old: ThreeGroupAttributesOld;

  constructor(old: ThreeGroupAttributesOld) {
    this.old = old;
    this.lazyTransitions = new LazyTransitions();
  }

  get3DGroupAttributes(adjustedFrame: number, fps: number): ThreeGroupAttributesOld {
    return combineOld(this.old, this.lazyTransitions.get3DGroupAttributes(adjustedFrame, fps));
  }
}

export default class ThreeDGroupActioner extends DivBaseActioner {
  static defaultValue: ThreeGroupAttributes = new ThreeGroupAttributes({
    scale: 1,
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    lookAtYd: 0,
    cameraDistanceD: 0,
  });

  protected getStyle(): LazyTransitions {
    throw new Error('Method not implemented.');
  }

  combine1(prev: ThreeGroupAttributes): ThreeGroupAttributes {
    const current = this.get3DGroupAttributes();
    const result = new ThreeGroupAttributes(combineOld(prev.old, current.old));
    result.lazyTransitions = (current.lazyTransitions.combine(prev.lazyTransitions));
    return result;
  }

  private get3DGroupAttributes(): ThreeGroupAttributes {
    const rotateY = this.getThreeRotateY();
    const scale = this.getThreeScale();
    const lookAtYd = this.getLookAtYd();
    const cameraDistanceD = this.getCameraDistanceD();

    const result = new ThreeGroupAttributes({
      position: new THREE.Vector3(0, 0, 0),
      scale,
      rotation: new THREE.Euler(0, rotateY, 0),
      lookAtYd,
      cameraDistanceD,
    });
    if(this.action.actionType === 'move') {
      result.lazyTransitions = this.move([0, 0, 0], this.action.distances);
    }
    if(this.action.actionType === 'rotate and rise') {
      result.lazyTransitions = this.move([0, -this.action.distance, 0], [0, 0, 0]);
    }
    if(this.action.actionType === '3d ocillating') {
      result.lazyTransitions = this.ocillate(this.action.distances);
    }

    return result;
  }

  private getCameraDistanceD(): number {
    switch(this.action.actionType) {
      case 'camera zoom in':
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
      case 'rotate and rise':
        return this.effectCalculator.interpolateSpring([-Math.PI * 2, 0]);
      case '3d rotate':
        return this.effectCalculator.interpolateDuration([0, Math.PI * (this.action as ThreeDRotateAction).totalRotation / 180]);
      default:
        return 0;
    }
  }

  private getThreeScale(): number {
    switch(this.action.actionType) {
      case 'rotate and rise':
        return this.effectCalculator.getSpring();
      default:
        return 1;
    }
  }
}
