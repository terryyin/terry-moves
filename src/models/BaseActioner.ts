import { Action } from '@/models/Subtitles';

interface Combinable<T> {
  combine(prev: T): T;
}

export default abstract class BaseActioner<T extends Combinable<T>> {
  action: Action;
  frameRange: [number, number];

  constructor(action: Action, frameRange: [number, number]) {
    this.frameRange = frameRange;
    this.action = action;
  }

  combine(prev: T): T {
    return this.getStyle().combine(prev);
  }

  protected abstract getStyle(): T;
}