import { Action, HighlightStyle, ReplaceTextAction } from '@/models/Subtitles';
import EffectCalculator from './EffectCalculator';

interface HighlightBase {
  style: HighlightStyle;
}

interface HighlightLines extends HighlightBase {
  lines: number[];
}

interface HighlightTokens extends HighlightBase {
  tokens: string[];
}

type Highlight = HighlightLines | HighlightTokens;

interface TextReplacement {
  line: number; match: string; replacement: string; progress: number;
}

export type CodeTransformation = {
  highlights: Highlight[];
  textReplacements: TextReplacement[];
  showCursor: boolean;
}


export class LazyCodeTransformation {
  highlights: Highlight[] = [];
  textReplacements: TextReplacement[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCodeTransfomation(adjustedFrame: number, fps: number): CodeTransformation {
    return {
      highlights: this.highlights,
      textReplacements: this.textReplacements,
      showCursor: Math.floor(adjustedFrame / fps * 2) % 2 === 0,
    }
  }

  combine(prev: LazyCodeTransformation): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    result.highlights = [...prev.highlights, ...this.highlights];
    result.textReplacements = [...prev.textReplacements, ...this.textReplacements];
    return result;
  }

  addTextRepacement(line: number, match: string, replacement: string, progress: number) {
    this.textReplacements.push({line, match, replacement, progress});
  }

  highlightToken(token: string, style: HighlightStyle) {
    this.highlights.push({tokens: [token], style});
  }

  highlightLines(lines: number[], style: HighlightStyle) {
    this.highlights.push({lines, style});
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
        return  this.highlightLines(this.action.lines, this.action.style ?? 'red background');
      case 'highlight token':
        return  this.highlightToken(this.action.token, this.action.style ?? 'red background');
      case 'replace text':
        return  this.replaceText(this.action);
      default:
        return new LazyCodeTransformation();
    }
  }

  replaceText(action: ReplaceTextAction): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    result.addTextRepacement(action.line, action.match, action.replacement, this.effectCalculator.interpolateDuration([0, 1.3]));
    return result;
  }

  highlightToken(token: string, style: HighlightStyle): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInDuration()) result.highlightToken(token, style);
    return result;
  }

  highlightLines(lines: number[], style: HighlightStyle): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInDuration()) result.highlightLines(lines, style);
    return result;
  }
}
