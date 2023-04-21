import {interpolate} from 'remotion'
import { CSSProperties } from 'react';

export default class LazyStyle {
  private style: CSSProperties;
  private opacityInterpolationInputRange: number[] = [];
  private opacityInterpolationOutputRange: number[] = [];

  constructor(style: CSSProperties) {
    this.style = style;
  }

  setOpacityInterpolation(inputRange: number[], outputRange: number[]) {
    this.opacityInterpolationInputRange = inputRange;
    this.opacityInterpolationOutputRange = outputRange;
  }

  combine(prev: LazyStyle): LazyStyle {
    // Combine opacity interpolation into strictly monotonically non-decreasing input range
    // and average output range if there's overlap
    const combinedInputRange: number[] = [];
    const combinedOutputRange: number[] = [];
    let prevOpacityOutputRangeIndex = 0;
    for (let i = 0; i < this.opacityInterpolationInputRange.length; i++) {
      const input = this.opacityInterpolationInputRange[i];
      const output = this.opacityInterpolationOutputRange[i];
      while (prevOpacityOutputRangeIndex < prev.opacityInterpolationInputRange.length && prev.opacityInterpolationInputRange[prevOpacityOutputRangeIndex] < input) {
        combinedInputRange.push(prev.opacityInterpolationInputRange[prevOpacityOutputRangeIndex]);
        combinedOutputRange.push(prev.opacityInterpolationOutputRange[prevOpacityOutputRangeIndex]);
        prevOpacityOutputRangeIndex++;
      }
      if (prevOpacityOutputRangeIndex > 0 && prev.opacityInterpolationInputRange[prevOpacityOutputRangeIndex - 1] === input) {
        combinedOutputRange[combinedOutputRange.length - 1] = (combinedOutputRange[combinedOutputRange.length - 1] + output) / 2;
      } else {
        combinedInputRange.push(input);
        combinedOutputRange.push(output);
      }
    }

    const combinedStyle = new LazyStyle({ ...prev.style, ...this.style });
    combinedStyle.setOpacityInterpolation(combinedInputRange, combinedOutputRange);

    return combinedStyle;
  }

  getStyle(frame: number): CSSProperties {
    const opacity =
      this.opacityInterpolationInputRange.length > 0
        ? interpolate(frame, this.opacityInterpolationInputRange, this.opacityInterpolationOutputRange, {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : undefined;

    return { ...this.style, ...(opacity === undefined ? {} : {opacity}) };
  }

  getStylePresence(frame: number): CSSProperties | undefined {
    const style = this.getStyle(frame);
    console.log(style)
    const { opacity, ...rest } = style;
    if(Object.keys(rest).length !== 0) return style;
    if (opacity === undefined || Number(opacity) === 1) return undefined;
    return style;
  }
}