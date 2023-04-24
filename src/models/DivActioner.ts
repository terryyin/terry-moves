import { ScaleToUpperRightAction } from './Subtitles';
import LazyTransitions from './LazyTransitions';
import DivBaseActioner from './DivBaseActioner';

export default class DivActioner extends DivBaseActioner{

  static defaultValue: LazyTransitions = new LazyTransitions()

  protected getStyle(): LazyTransitions {
    switch(this.action.actionType) {
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

  private getScaleToUpperRightStyle(action: ScaleToUpperRightAction): LazyTransitions {
    const scale = this.effectCalculator.interpolateDuration(action.outputRange);
    const result = new LazyTransitions({scale: scale / 100, translateX: (100 - scale), translateY: (scale-100)})

    return result;
  }
}