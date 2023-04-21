import { ScaleToUpperRightAction } from './Subtitles';
import LazyStyle from './LazyStyle';
import DivBaseActioner from './DivBaseActioner';

export default class DivActioner extends DivBaseActioner{

  static defaultValue: LazyStyle = new LazyStyle({})

  protected getStyle(): LazyStyle {
    switch(this.action.action) {
      case 'scaleToUpperRight':
        return this.getScaleToUpperRightStyle(this.action);
      case 'appear':
        return this.getAppearStyle([0, 1]);
      case 'disappear':
        return this.getAppearStyle([1, 0]);
      case 'glow':
        return DivActioner.defaultValue;
      default:
        throw new Error(`Unknown action type for div ${this.action.action}`);
    }
  }

  private getAppearStyle(outputRange: number[]): LazyStyle {
    const result = new LazyStyle({});
    result.setOpacityInterpolation({inputRange: this.effectCalculator.frameRange, outputRange});
    return result;
  }

  private getScaleToUpperRightStyle(action: ScaleToUpperRightAction): LazyStyle {
    const scale = this.effectCalculator.interpolateDuration(action.outputRange);
    return new LazyStyle({
      left: `${100 - scale}%`, top:'0%', width: `${scale}%`, height: `${scale}%`
    })
  }
}