import { InterpolateRanges, combineInterpolates } from './combine_interpolates';
import {interpolate} from 'remotion'
import { CSSProperties } from 'react';

export default class LazyStyle {
  private style: CSSProperties;
  private opaciytInterpolateRanges: InterpolateRanges = {inputRange: [], outputRange: []};

  constructor(style: CSSProperties) {
    this.style = style;
  }

  setOpacityInterpolation(interpolateRanges: InterpolateRanges): void {
    this.opaciytInterpolateRanges = interpolateRanges;
  }

  combine(prev: LazyStyle): LazyStyle {
    const combinedStyle = new LazyStyle({ ...prev.style, ...this.style });
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

    return { ...this.style, ...(opacity === undefined ? {} : {opacity}) };
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