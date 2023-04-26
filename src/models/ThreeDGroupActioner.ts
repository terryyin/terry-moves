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

class ThreeGroupAttributes {
  lazyTransitions: LazyTransitions;

  constructor() {
    this.lazyTransitions = new LazyTransitions();
  }

  get3DGroupAttributes(adjustedFrame: number, fps: number): ThreeGroupAttributesOld {
    return this.lazyTransitions.get3DGroupAttributes(adjustedFrame, fps);
  }
}

export default class ThreeDGroupActioner extends DivBaseActioner {
  static defaultValue: ThreeGroupAttributes = new ThreeGroupAttributes();

  protected getStyle(): LazyTransitions {
    throw new Error('Method not implemented.');
  }

  combine1(prev: ThreeGroupAttributes): ThreeGroupAttributes {
    const current = this.get3DGroupAttributes();
    const result = new ThreeGroupAttributes();
    result.lazyTransitions = (current.lazyTransitions.combine(prev.lazyTransitions));
    return result;
  }

  private get3DGroupAttributes(): ThreeGroupAttributes {
    const result = new ThreeGroupAttributes();
    if(this.action.actionType === 'move') {
      result.lazyTransitions = this.move([0, 0, 0], this.action.absolutePosition);
    }
    if(this.action.actionType === 'rotate and rise') {
      result.lazyTransitions = this.scale([0, 1])
        .combine(this.move([0, -this.action.distance, 0], [0, 0, 0]))
        .combine(this.rotateFrom([0, -360, 0]));
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

}
