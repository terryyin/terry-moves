import * as THREE from 'three';
import LazyTransitions from './LazyTransitions';
import DivBaseActioner from './DivBaseActioner';

export type ThreeGroupAttributesOld = {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  lookAtD: THREE.Vector3;
  cameraDistanceD: number;
}

const combineOld = (prev: ThreeGroupAttributesOld, current: ThreeGroupAttributesOld): ThreeGroupAttributesOld =>{
  return {
    scale: prev.scale * current.scale,
    position: prev.position.clone().add(current.position),
    rotation: new THREE.Euler(prev.rotation.x + current.rotation.x, prev.rotation.y + current.rotation.y, prev.rotation.z + current.rotation.z),
    lookAtD: prev.lookAtD.clone().add(current.lookAtD),
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
    lookAtD: new THREE.Vector3(0, 0, 0),
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

    const result = new ThreeGroupAttributes({
      position: new THREE.Vector3(0, 0, 0),
      scale: 1,
      rotation: new THREE.Euler(0, rotateY, 0),
      lookAtD: new THREE.Vector3(0, 0, 0),
      cameraDistanceD: 0,
    });
    if(this.action.actionType === 'move') {
      result.lazyTransitions = this.move([0, 0, 0], this.action.absolutePosition);
    }
    if(this.action.actionType === 'rotate and rise') {
      result.lazyTransitions = this.scale([0, 1])
        .combine(this.move([0, -this.action.distance, 0], [0, 0, 0]));
    }
    if(this.action.actionType === 'ocillate') {
      result.lazyTransitions = this.ocillate(this.action.delta);
    }
    if(this.action.actionType === 'camera zoom in'){
      result.lazyTransitions =  this.cameraZoomIn(this.action.distance);
    }
    if(this.action.actionType === 'camera look at'){
      result.lazyTransitions =  this.cameraLookAt(this.action.absolutePosition);
    }
    if(this.action.actionType === '3d rotate'){
      result.lazyTransitions =  this.rotate(this.action.totalRotation);
    }

    return result;
  }

  private getThreeRotateY(): number {
    switch(this.action.actionType) {
      case 'rotate and rise':
        return this.effectCalculator.interpolateSpring([-Math.PI * 2, 0]);
      default:
        return 0;
    }
  }
}
