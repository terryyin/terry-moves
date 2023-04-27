import { Action } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';

export type CodeTransformation = {
  highlightLines: number[];
}

export class LazyCodeTransformation {
  highlightedLines: number[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCodeTransfomation(adjustedFrame: number, fps: number): CodeTransformation {
    return {
      highlightLines: this.highlightedLines,
    }
  }

  combine(prev: LazyCodeTransformation): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    result.highlightedLines = [...prev.highlightedLines, ...this.highlightedLines];
    return result;
  }

  highlightLines(lines: number[]) {
    this.highlightedLines = [...this.highlightedLines, ...lines];
  }
}

export default class CodeActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  static defaultValue: LazyCodeTransformation = new LazyCodeTransformation();

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.effectCalculator = effectCalculator;
    this.action = action;
  }

  combine(prev: LazyCodeTransformation): LazyCodeTransformation {
    return this.getCurrentValue().combine(prev);
  }

  private getCurrentValue(): LazyCodeTransformation {
    switch(this.action.actionType) {
      case 'highlight lines':
        return  this.highlightLines(this.action.lines);
      default:
        return new LazyCodeTransformation();
    }
  }

  highlightLines(lines: number[]): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInDuration()) result.highlightLines(lines);
    return result;
  }
}
