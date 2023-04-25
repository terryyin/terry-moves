import { InterpolateRanges } from './combine_interpolates';
import {interpolate} from 'remotion'
import { CSSProperties } from 'react';

type TransformProperties = {
  translateX?: number;
  translateY?: number;
};

const getInterpolate = (frame: number, interpolateRanges?: InterpolateRanges[]): number | undefined => {
  if(!interpolateRanges || interpolateRanges.length === 0) return undefined;
  let prev: InterpolateRanges | undefined;
  let current = interpolateRanges[0];
  for(let i = 1; i < interpolateRanges.length; i++) {
    if(frame >= interpolateRanges[i].inputRange[0]) {
      prev = current;
      current = interpolateRanges[i];
    }
  }
  const outputRange = [...current.outputRange];
  if(prev) {
    outputRange[0] = prev.outputRange[prev.outputRange.length - 1];
  }
  return interpolate(frame, current.inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

type InterpolateFields = 'opacity' | 'scale' | 'translateY' | 'translateX';
export default class LazyTransitions {
  private interpolateRanges: Map<InterpolateFields, InterpolateRanges[]> = new Map();
  private transformProperties: TransformProperties;

  constructor(transformProperties: TransformProperties) {
    this.transformProperties = transformProperties;
  }

  private setInterpolation(key: InterpolateFields, interpolateRange: InterpolateRanges): void {
    if(!this.interpolateRanges.get(key)) {
      this.interpolateRanges.set(key, []);
    };
    const array = this.interpolateRanges.get(key);
    if(array) {
      array.push(interpolateRange);
    }
  }

  setOpacityInterpolation(interpolateRanges: InterpolateRanges): void {
    this.setInterpolation('opacity', interpolateRanges);
  }

  setScaleInterpolation(interpolateRanges: InterpolateRanges) {
    this.setInterpolation('scale', interpolateRanges);
  }

  setTranslateXInterpolation(interpolateRanges: InterpolateRanges) {
    this.setInterpolation('translateX', interpolateRanges);
  }

  setTranslateYInterpolation(interpolateRanges: InterpolateRanges) {
    this.setInterpolation('translateY', interpolateRanges);
  }

  combine(prev: LazyTransitions): LazyTransitions {
    const combinedStyle = new LazyTransitions(combineTransformProperties(this.transformProperties));
    (['opacity', 'scale', 'translateY', 'translateX'] as InterpolateFields[]).forEach((key) => {
      const combined = [...prev.interpolateRanges.get(key) || [], ...this.interpolateRanges.get(key) || []];
      combinedStyle.interpolateRanges.set(key, combined);
    });

    return combinedStyle;
  }

  getStyle(frame: number): CSSProperties {
    const opacity = getInterpolate(frame, this.interpolateRanges.get('opacity'));
    const scale = getInterpolate(frame, this.interpolateRanges.get('scale'));
    const translateX = getInterpolate(frame, this.interpolateRanges.get('translateX'));
    const translateY = getInterpolate(frame, this.interpolateRanges.get('translateY'));
    const transforms: string[] = [];

    if (scale !== undefined) {
      transforms.push(`scale(${scale})`);
    }
    if (translateX !== undefined) {
      transforms.push(`translateX(${translateX}px)`);
    }
    if (translateY !== undefined) {
      transforms.push(`translateY(${translateY}px)`);
    }

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

  getStylePresence(frame: number): CSSProperties | undefined {
    const style = this.getStyle(frame);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { opacity, transform, transformOrigin, ...rest } = style;
    if(Object.keys(rest).length !== 0) return style;
    if (opacity === undefined || Number(opacity) === 1 || Number(opacity) < 0.01) return undefined;
    return style;
  }
}


function combineTransformProperties(left: TransformProperties): TransformProperties {
  return  { ...left };
}
