import { ScaleAction } from './Subtitles';
import LazyTransitions from './LazyTransitions';
import DivBaseActioner from './DivBaseActioner';

export default class DivActioner extends DivBaseActioner{

  static defaultValue: LazyTransitions = new LazyTransitions({})

  protected getStyle(): LazyTransitions {
    switch(this.action.actionType) {
      case 'scale':
        return this.getScaleStyle(this.action);
      case 'scaleToUpperRight':
        return this.getScaleToUpperRightStyle(this.action);
      case 'appear':
        return this.getAppearStyle([0, 1]);
      case 'disappear':
        return this.getAppearStyle([1, 0]);
      case 'glow':
        return DivActioner.defaultValue;
      default:
        throw new Error(`Unknown action type for div ${this.action.actionType}`);
    }
  }

  private getAppearStyle(outputRange: number[]): LazyTransitions {
    const result = new LazyTransitions({});
    result.setOpacityInterpolation({inputRange: this.effectCalculator.frameRange, outputRange});
    return result;
  }

  private getScaleToUpperRightStyle(action: ScaleAction): LazyTransitions {
    const result = new LazyTransitions({})
    result.setScaleInterpolation({inputRange: this.effectCalculator.frameRange, outputRange: action.outputRange.map((value) => value / 100)});
    result.setTranslateXInterpolation({inputRange: this.effectCalculator.frameRange, outputRange: action.outputRange});
    result.setTranslateYInterpolation({inputRange: this.effectCalculator.frameRange, outputRange: action.outputRange});
    return result;
  }

  private getScaleStyle(action: ScaleAction): LazyTransitions {
    const result = new LazyTransitions({})
    result.setScaleInterpolation({inputRange: this.effectCalculator.frameRange, outputRange: action.outputRange});
    return result;
  }
}