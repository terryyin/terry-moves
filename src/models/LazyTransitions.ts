import { InterpolateRanges, combineInterpolates } from './combine_interpolates';
import {interpolate} from 'remotion'
import { CSSProperties } from 'react';

type TransformProperties = {
  translateX?: number;
  translateY?: number;
};

const getInterpolate = (frame: number, interpolateRanges: InterpolateRanges): number | undefined => {
  return  interpolateRanges.inputRange.length > 0
      ? interpolate(frame, interpolateRanges.inputRange, interpolateRanges.outputRange, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : undefined;
}

export default class LazyTransitions {
  private opaciytInterpolateRanges: InterpolateRanges = {inputRange: [], outputRange: []};
  private scaleInterpolateRanges: InterpolateRanges = {inputRange: [], outputRange: []};
  private transformProperties: TransformProperties;

  constructor(transformProperties: TransformProperties) {
    this.transformProperties = transformProperties;
  }

  setOpacityInterpolation(interpolateRanges: InterpolateRanges): void {
    this.opaciytInterpolateRanges = interpolateRanges;
  }

  setScaleInterpolation(interpolateRanges: InterpolateRanges) {
      this.scaleInterpolateRanges = interpolateRanges;
  }

  combine(prev: LazyTransitions): LazyTransitions {
    const combinedStyle = new LazyTransitions(combineTransformProperties(this.transformProperties));
    combinedStyle.setOpacityInterpolation(combineInterpolates(this.opaciytInterpolateRanges, prev.opaciytInterpolateRanges));
    combinedStyle.setScaleInterpolation(combineInterpolates(this.scaleInterpolateRanges, prev.scaleInterpolateRanges));

    return combinedStyle;
  }

  getStyle(frame: number): CSSProperties {
    const opacity = getInterpolate(frame, this.opaciytInterpolateRanges);
    const scale = getInterpolate(frame, this.scaleInterpolateRanges);
    return { ...this.getTransform(scale), ...(opacity === undefined ? {} : {opacity})  };
  }

  private getTransform(scale: number | undefined)  {
    if (scale === undefined) {
      return {};
    }
    const transform = `scale(${scale}) translateX(${this.transformProperties.translateX}%) translateY(${this.transformProperties.translateY}%)`;
    return { transform, transformOrigin: 'center'};
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
