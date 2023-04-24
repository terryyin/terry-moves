import { InterpolateRanges, combineInterpolates } from './combine_interpolates';
import {interpolate} from 'remotion'
import { CSSProperties } from 'react';

type TransformProperties = {
  scale?: number;
  translateX?: number;
  translateY?: number;
};
export default class LazyTransitions {
  private opaciytInterpolateRanges: InterpolateRanges = {inputRange: [], outputRange: []};
  private transformProperties: TransformProperties;

  constructor(transformProperties: TransformProperties) {
    this.transformProperties = transformProperties;
  }

  setOpacityInterpolation(interpolateRanges: InterpolateRanges): void {
    this.opaciytInterpolateRanges = interpolateRanges;
  }

  combine(prev: LazyTransitions): LazyTransitions {
    const combinedStyle = new LazyTransitions(this.transformProperties);
    combinedStyle.setOpacityInterpolation(combineInterpolates(this.opaciytInterpolateRanges, prev.opaciytInterpolateRanges));

    return combinedStyle;
  }

  getStyle(frame: number): CSSProperties {
    const opacity =
      this.opaciytInterpolateRanges.inputRange.length > 0
        ? interpolate(frame, this.opaciytInterpolateRanges.inputRange, this.opaciytInterpolateRanges.outputRange, {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : undefined;
      const transform = this.getTransform();

    return { ...(opacity === undefined ? {} : {opacity}), ...(transform === undefined ? {} : {transform, transformOrigin: 'center'}) };
  }

  private getTransform(): string | undefined {
    const transform = this.transformProperties.scale ? `scale(${this.transformProperties.scale}) translateX(${this.transformProperties.translateX}%) translateY(${this.transformProperties.translateY}%)` : undefined;
    return transform;
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