import { Action, HighlightStyle, InsertTextAction, ReplaceTextAction } from '@/models/Subtitles';
import EffectCalculator, { EffectCalculatorAndAction } from './EffectCalculator';

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

interface TextEditBase {
  line: number; progress: number; text: string;
}

interface TextReplacement extends TextEditBase {
  match?: string;
}

interface TextInsertion extends TextEditBase {
  cursor: boolean;
  insertCursor: boolean;
  column: number;
}

interface LineDeletion extends TextEditBase {
  count: number;
}

export type TextEdit = TextReplacement | TextInsertion | LineDeletion;

export type CodeTransformation = {
  highlights: Highlight[];
  textEdits: TextEdit[];
  showCursor: boolean;
}


export class LazyCodeTransformation {
  highlights: Highlight[] = [];
  textEdits: TextEdit[] = [];
  textInsertActions: InsertTextAction[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCodeTransfomation(adjustedFrame: number, fps: number): CodeTransformation {
    return {
      highlights: this.highlights,
      textEdits: this.textEdits,
      showCursor: Math.floor(adjustedFrame / fps * 2) % 2 === 0,
    }
  }

  combine(prev: LazyCodeTransformation): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    result.highlights = [...prev.highlights, ...this.highlights];
    result.textEdits = [...prev.textEdits, ...this.textEdits];
    result.textInsertActions = [...prev.textInsertActions, ...this.textInsertActions];
    return result;
  }

  addTextInsert(action: InsertTextAction, effectCalculator: EffectCalculator) {
    this.textInsertActions.push(action);
    const insert: TextInsertion = {
      line: action.line, column: action.column, text: action.text, progress: effectCalculator.interpolateDuration([0, 1]),
      cursor: effectCalculator.blink(0.5, 0.3),
      insertCursor: effectCalculator.withInStartDuration(0.5) || effectCalculator.withInEndDuration(0.5) || effectCalculator.withInDuration(),
    }
    this.textEdits.push(insert);
  }

  addDeleteLines(fromLine: number, count: number, progress: number) {
    this.textEdits.push({line: fromLine, count, progress, text: ''});
  }

  addTextRepacement(line: number, match: string | undefined, text: string, progress: number) {
    this.textEdits.push({line, match, text, progress});
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

  constructor(effectCalculator: EffectCalculatorAndAction) {
    this.effectCalculator = effectCalculator.effectCalculator;
    this.action = effectCalculator.action;
  }

  combine(prev: LazyCodeTransformation): LazyCodeTransformation {
    return this.getCurrentValue().combine(prev);
  }

  private getCurrentValue(): LazyCodeTransformation {
    switch(this.action.actionType) {
      case 'highlight lines':
        return  this.highlightLines(this.action.lines, this.action.style ?? 'red background');
      case 'delete lines':
        return  this.deleteLines(this.action.fromLine, this.action.count);
      case 'highlight token':
        return  this.highlightToken(this.action.token, this.action.style ?? 'red background');
      case 'replace text':
        return  this.replaceText(this.action);
      case 'insert text':
        return  this.insertText(this.action);
      default:
        return new LazyCodeTransformation();
    }
  }

  insertText(action: InsertTextAction): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInDuration() || this.effectCalculator.isAfter()) {
      result.addTextInsert(action, this.effectCalculator);
    }
    return result;
  }

  replaceText(action: ReplaceTextAction): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInDuration() || this.effectCalculator.isAfter()) {
      result.addTextRepacement(action.line, action.match, action.replacement, this.effectCalculator.interpolateDuration([0, 1]));
    }
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

  deleteLines(fromLine: number, count: number): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInDuration() || this.effectCalculator.isAfter()) result.addDeleteLines(fromLine, count, this.effectCalculator.interpolateDuration([0, 1]));
    return result;
  }

}
