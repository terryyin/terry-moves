import {interpolate} from 'remotion'
import LazyTransitions from './LazyTransitions';
import DivBaseActioner from './DivBaseActioner';

export default class DivActioner extends DivBaseActioner{

  static defaultValue: LazyTransitions = new LazyTransitions({});

  protected getStyle(): LazyTransitions {
    switch(this.action.actionType) {
      case 'glow':
        return this.getGrow();
      default:
        return DivActioner.defaultValue;
    }
  }

  private getGrow(): LazyTransitions {
    const progress = this.effectCalculator.getSpring();
    const size = interpolate(progress, [0, 1], [100, 120]);
    const result = new LazyTransitions({}, {scale: size/100, translateX: '0px', translateY: '0px'});
    result.setOpacityInterpolation({inputRange: this.effectCalculator.frameRange, outputRange: [1, 0]});
    return result;
  }

}