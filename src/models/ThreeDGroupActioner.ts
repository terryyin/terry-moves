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

export default class ThreeDGroupActioner extends DivBaseActioner {
  static defaultValue: LazyTransitions = new LazyTransitions();

  protected getStyle(): LazyTransitions {
    throw new Error('Method not implemented.');
  }

  combine1(prev: LazyTransitions): LazyTransitions {
    const current = this.get3DGroupAttributes();
    return current.combine(prev);
  }

  private get3DGroupAttributes(): LazyTransitions {
    if(this.action.actionType === 'move') {
      return this.move([0, 0, 0], this.action.absolutePosition);
    }
    if(this.action.actionType === 'rotate and rise') {
      return this.scale([0, 1])
        .combine(this.move([0, -this.action.distance, 0], [0, 0, 0]))
        .combine(this.rotateFrom([0, -360, 0]));
    }
    if(this.action.actionType === 'ocillate') {
      return this.ocillate(this.action.delta);
    }
    if(this.action.actionType === 'camera zoom in'){
      return  this.cameraZoomIn(this.action.distance);
    }
    if(this.action.actionType === 'camera look at'){
      return  this.cameraLookAt(this.action.absolutePosition);
    }
    if(this.action.actionType === '3d rotate'){
      return  this.rotate(this.action.totalRotation);
    }

    return new LazyTransitions();
  }

}
