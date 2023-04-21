import {interpolate} from 'remotion'
import LazyStyle from './LazyStyle';
import DivBaseActioner from './DivBaseActioner';

export default class DivActioner extends DivBaseActioner{

  static defaultValue: LazyStyle = new LazyStyle({});

  protected getStyle(): LazyStyle {
    switch(this.action.action) {
      case 'glow':
        return this.getGrow();
      default:
        return DivActioner.defaultValue;
    }
  }

  private getGrow(): LazyStyle {
    const progress = this.effectCalculator.getSpring();
    const size = interpolate(progress, [0, 1], [100, 120]);
    return new LazyStyle({transform: `scale(${size / 100})`, transformOrigin: 'center', opacity: `${1 - progress}`});
  }

}