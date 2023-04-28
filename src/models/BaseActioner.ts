import { Action } from '@/models/Subtitles';
import LazyTransitions from './LazyTransitions';

export default abstract class BaseActioner {
  action: Action;
  frameRange: [number, number];

  constructor(action: Action, frameRange: [number, number]) {
    this.frameRange = frameRange;
    this.action = action;
  }

  combine(prev: LazyTransitions): LazyTransitions {
    return this.getStyle().combine(prev);
  }

  protected abstract getStyle(): LazyTransitions;
}