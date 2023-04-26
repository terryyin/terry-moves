import { CSSProperties } from 'react';
import * as THREE from 'three';
import EffectCalculator from './EffectCalculator';

export type TextReveal = {
  progress: number;
  cursorShow: boolean;
};

export type ThreeGroupAttributesOld = {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  lookAtD: THREE.Vector3;
  cameraDistanceD: number;
}

type InterpolateType = 'linear' | 'spring' | 'ocillate';

type InterpolateRangesBase = {
  interpolateType: InterpolateType;
  inputRange: number[];
}

interface InterpolateRangesOcillate extends InterpolateRangesBase {
  interpolateType: 'ocillate';
  distance: number;
}

interface InterpolateRangesNonOcillate extends InterpolateRangesBase {
  interpolateType: 'linear' | 'spring';
  outputRange: number[];
}

type InterpolateRanges = InterpolateRangesNonOcillate | InterpolateRangesOcillate;

export type InterpolateFields = 'textReveal' | 'rotationX' | 'rotationY' | 'rotationZ' | 'cameraLookAtX' | 'cameraLookAtY' | 'cameraLookAtY' | 'opacity' | 'scale' | 'translateY' | 'translateX' | 'translateZ' | 'cameraDistanceD';

export default class LazyTransitions {
  interpolateRanges: Map<InterpolateFields, InterpolateRanges[]> = new Map();

  setInterpolation(key: InterpolateFields, interpolateRange: InterpolateRanges): void {
    if(!this.interpolateRanges.get(key)) {
      this.interpolateRanges.set(key, []);
    };
    const array = this.interpolateRanges.get(key);
    if(array) {
      array.push(interpolateRange);
    }
  }

  combine(prev: LazyTransitions): LazyTransitions {
    const combinedStyle = new LazyTransitions();
    (['textReveal', 'rotationX', 'rotationY', 'rotationZ', 'cameraLookAtX', 'cameraLookAtY', 'cameraLookAtY', 'opacity', 'scale', 'translateX', 'translateY', 'translateZ', 'cameraDistanceD'] as InterpolateFields[]).forEach((key) => {
      const combined = [...prev.interpolateRanges.get(key) || [], ...this.interpolateRanges.get(key) || []];
      combinedStyle.interpolateRanges.set(key, combined);
    });

    return combinedStyle;
  }

  getStyle(frame: number, fps: number): CSSProperties {
    const opacity = this.getMultiplyingInterpolate(frame, fps,    'opacity');
    const scale = this.getMultiplyingInterpolate(frame, fps,      'scale');
    const transforms: string[] = [];

    if (scale !== undefined) {
      transforms.push(`scale(${scale})`);
    }
    
    (['translateX', 'translateY', 'translateZ'] as InterpolateFields[]).forEach((key) => {
      const translate = this.getAddingInterpolate(frame, fps, key);
      if (translate !== undefined) {
        transforms.push(`${key}(${translate}px)`);
      }
    });

    const result: CSSProperties = {};

    if (transforms.length > 0) {
      result.transform = transforms.join(' ');
      if (scale !== undefined) {
        result.transformOrigin = 'center';
      }
    }
    if (opacity !== undefined) {
      result.opacity = opacity;
    }

    return result;
  }

  get3DGroupAttributes(frame: number, fps: number): ThreeGroupAttributesOld {
    // Const opacity = this.getInterpolate(frame,    'opacity');
    const scale = this.getMultiplyingInterpolate(frame, fps,      'scale');
    const cameraDistanceD = this.getAddingInterpolate(frame, fps, 'cameraDistanceD');
    
    const position = [0, 0, 0];
    (['translateX', 'translateY', 'translateZ'] as InterpolateFields[]).forEach((key, index) => {
      const translate = this.getAddingInterpolate(frame, fps, key);
      if (translate !== undefined) {
        position[index] = translate;
      }
    });

    const cameraLookAt = [0, 0, 0];
    (['cameraLookAtX', 'cameraLookAtY', 'cameraLookAtZ'] as InterpolateFields[]).forEach((key, index) => {
      const translate = this.getAddingInterpolate(frame, fps, key);
      if (translate !== undefined) {
        cameraLookAt[index] = translate;
      }
    });

    const rotation = [0, 0, 0];
    (['rotationX', 'rotationY', 'rotationZ'] as InterpolateFields[]).forEach((key, index) => {
      const translate = this.getAddingInterpolate(frame, fps, key);
      if (translate !== undefined) {
        rotation[index] = translate;
      }
    });

    const result: ThreeGroupAttributesOld = {
      scale: scale ?? 1,
      position: new THREE.Vector3(position[0], position[1], position[2]),
      rotation: new THREE.Euler(rotation[0], rotation[1], rotation[2]),
      lookAtD: new THREE.Vector3(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2]),
      cameraDistanceD: cameraDistanceD ?? 0,
    };
    return result;
  }

  getStylePresence(frame: number, fps: number): CSSProperties | undefined {
    const style = this.getStyle(frame, fps);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { opacity, transform, transformOrigin, ...rest } = style;
    if(Object.keys(rest).length !== 0) return style;
    if (opacity === undefined || Number(opacity) === 1 || Number(opacity) < 0.01) return undefined;
    return style;
  }

  getTextReveal(adjustedFrame: number, fps: number): TextReveal {
    return {
      progress: this.getAddingInterpolate(adjustedFrame, fps, 'textReveal') ?? 0,
      cursorShow: adjustedFrame / fps % 1 < 0.5,
    };
  }

  private getAddingInterpolate(frame: number, fps: number, field: InterpolateFields): number | undefined {
    return this.reduceInterpolate(frame, fps, field, (a, b) => a + b, 0);
  }

  private getMultiplyingInterpolate(frame: number, fps: number, field: InterpolateFields): number | undefined {
    return this.reduceInterpolate(frame, fps, field, (a, b) => a * b, 1);
  }

  // eslint-disable-next-line max-params
  private reduceInterpolate(frame: number, fps: number, field: InterpolateFields, oper: (a: number, b: number)=>number, defaultValue: number): number | undefined {
    const values = this.getInterpolateValues(frame, fps, field);
    if(values.length === 0) return undefined;
    return values.reduce(oper, defaultValue);
  }

  private getInterpolateValues (frame: number, fps: number, field: InterpolateFields): number[] {
    const interpolateRanges = this.interpolateRanges.get(field);
    const result: number[] = []
    if(!interpolateRanges || interpolateRanges.length === 0) return result;
    let prev: number | undefined;
    let current = interpolateRanges[0];
    for(let i = 0; i < interpolateRanges.length; i++) {
      if(frame >= interpolateRanges[i].inputRange[0]) {
        current = interpolateRanges[i];
        const prevAny = interpolateRanges[i - 1];
        if(i > 0 && frame >= prevAny.inputRange[prevAny.inputRange.length - 1] 
          && prevAny.interpolateType !== 'ocillate') prev = prevAny.outputRange[prevAny.outputRange.length - 1];
        if(frame < current.inputRange[current.inputRange.length - 1]) {
          result.push(this.getInterpolateValue(frame, fps, prev, current));
        }
      }
    }
    if (result.length === 0) {
      result.push(this.getInterpolateValue(frame, fps, prev, current));
    }

    return result;
  }

  private getInterpolateValue (frame: number, fps: number, prev: number | undefined, current: InterpolateRanges): number {
    const effectCalculator: EffectCalculator = new EffectCalculator(
      (current.inputRange[current.inputRange.length - 1] - current.inputRange[0]) / fps,
      current.inputRange[0] /fps,
      frame,
      fps
    );

    if(current.interpolateType === 'ocillate') {
		  const result = -Math.sin(effectCalculator.timeWithIn() * Math.PI * 2) * current.distance;
      return result + (prev ?? 0);
    }

    const outputRange = [...current.outputRange];
    if(prev) {
      outputRange[0] = prev;
    }

    if(current.interpolateType === 'spring') return effectCalculator.interpolateSpring(outputRange);
    return effectCalculator.interpolateDuration(outputRange);
  }
}