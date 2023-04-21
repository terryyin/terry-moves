import {interpolate} from 'remotion'
import { ScaleToUpperRightAction } from './Subtitles';
import { CSSProperties } from 'react';
import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';

class LazyStyle {
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
}


export default class DivActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  static defaultValue: LazyStyle = new LazyStyle({})

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  combine(prev: LazyStyle): LazyStyle {
    return this.getStyle().combine(prev);
  }

  private getStyle(): LazyStyle {
    switch(this.action.action) {
      case 'scaleToUpperRight':
        return this.getScaleToUpperRightStyle(this.action);
      case 'appear':
        return this.getAppearStyle([0, 1]);
      case 'disappear':
        return this.getAppearStyle([1, 0]);
      default:
        throw new Error(`Unknown action type for div ${this.action.action}`);
    }
  }

  getAppearStyle(range: number[]): LazyStyle {
    const result = new LazyStyle({});
    result.setOpacityInterpolation(this.effectCalculator.frameRange, range);
    return result;
  }

  private getScaleToUpperRightStyle(action: ScaleToUpperRightAction): LazyStyle {
    const scale = this.effectCalculator.interpolateDuration(action.outputRange);
    return new LazyStyle({
      left: `${100 - scale}%`, top:'0%', width: `${scale}%`, height: `${scale}%`
    })
  }
}