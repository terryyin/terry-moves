import LazyTransitions from './LazyTransitions';
import DivBaseActioner from './DivBaseActioner';

export default class DivActioner extends DivBaseActioner{

  static defaultValue: LazyTransitions = new LazyTransitions();

  protected getStyle(): LazyTransitions {
    switch(this.action.actionType) {
      case 'glow':
        return this.getGrow();
      default:
        return DivActioner.defaultValue;
    }
  }

  private getGrow(): LazyTransitions {
    const result = new LazyTransitions();
    result.setInterpolation('glow', {interpolateType: 'linear', inputRange: this.effectCalculator.frameRange, outputRange: [0, 1]});
    result.setInterpolation('opacity', {interpolateType: 'linear', inputRange: this.effectCalculator.frameRange, outputRange: [1, 0]});
    result.setInterpolation('scale', {interpolateType: 'linear', inputRange: this.effectCalculator.frameRange, outputRange: [1, 1.2]});
    return result;
  }

}