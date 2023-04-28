import { Action } from '@/models/Subtitles';
import LazyThreeDObjectState from './LazyThreeDObjectState';

export default abstract class BaseActioner {
  action: Action;
  frameRange: [number, number];

  constructor(action: Action, frameRange: [number, number]) {
    this.frameRange = frameRange;
    this.action = action;
  }

  combine(prev: LazyThreeDObjectState): LazyThreeDObjectState {
    return this.getStyle().combine(prev);
  }

  protected abstract getStyle(): LazyThreeDObjectState;
}