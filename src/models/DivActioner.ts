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
    const scale = this.getScale(action);
    const result = new LazyTransitions({scale: scale / 100, translateX: (100 - scale), translateY: (scale-100)})
    return result;
  }

  private getScaleStyle(action: ScaleAction): LazyTransitions {
    const scale = this.getScale(action);
    const result = new LazyTransitions({scale: scale / 100, translateX: (0), translateY: (0)})
    return result;
  }

  private getScale(action: ScaleAction): number {
    return this.effectCalculator.interpolateDuration(action.outputRange);
  }

}