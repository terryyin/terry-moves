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
  cursor: boolean;
  insertCursor: boolean;
  progress: number;
}

interface TextReplacement extends TextEditBase {
  match?: string;
  line: number;
  text: string;
}

interface TextInsertion extends TextEditBase {
  column: number;
  line: number;
  text: string;
}

interface LineDeletion extends TextEditBase {
  count: number;
  line: number;
}

export type TextEdit = TextReplacement | TextInsertion | LineDeletion;

export type CodeTransformation = {
  highlights: Highlight[];
  textEdits: TextEdit[];
}


export class LazyCodeTransformation {
  highlights: Highlight[] = [];
  textEdits: TextEdit[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCodeTransfomation(adjustedFrame: number, fps: number): CodeTransformation {
    return {
      highlights: this.highlights,
      textEdits: this.textEdits,
    }
  }

  combine(prev: LazyCodeTransformation): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    result.highlights = [...prev.highlights, ...this.highlights];
    result.textEdits = [...prev.textEdits, ...this.textEdits];
    return result;
  }

  addTextInsert(action: InsertTextAction, effectCalculator: EffectCalculator) {
    this.addTextEdit({line: action.line, column: action.column, text: action.text}, effectCalculator);
  }

  addDeleteLines(fromLine: number, count: number, effectCalculator: EffectCalculator) {
    this.addTextEdit({line: fromLine, count }, effectCalculator);
  }

  addTextRepacement(line: number, match: string | undefined, text: string, effectCalculator: EffectCalculator) {
    this.addTextEdit({line, match, text}, effectCalculator);
  }

  highlightToken(token: string, style: HighlightStyle) {
    this.highlights.push({tokens: [token], style});
  }

  highlightLines(lines: number[], style: HighlightStyle) {
    this.highlights.push({lines, style});
  }

  private addTextEdit(edit: Partial<TextEdit>, effectCalculator: EffectCalculator) {
    const insert = {
      ...edit,
      progress: effectCalculator.interpolateDuration([0, 1]),
      cursor: effectCalculator.blink(0.4, 0.4),
      insertCursor: effectCalculator.withInStartDuration(0.5) || effectCalculator.withInEndDuration(0.5) || effectCalculator.withInPersistDuration(),
    }
    this.textEdits.push(insert as TextEdit);
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
    if(this.effectCalculator.withInWholeDuration() || this.effectCalculator.isAfterPersist()) {
      result.addTextInsert(action, this.effectCalculator);
    }
    return result;
  }

  replaceText(action: ReplaceTextAction): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInWholeDuration() || this.effectCalculator.isAfterPersist()) {
      result.addTextRepacement(action.line, action.match, action.replacement, this.effectCalculator);
    }
    return result;
  }

  highlightToken(token: string, style: HighlightStyle): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInWholeDuration()) result.highlightToken(token, style);
    return result;
  }

  highlightLines(lines: number[], style: HighlightStyle): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInWholeDuration()) result.highlightLines(lines, style);
    return result;
  }

  deleteLines(fromLine: number, count: number): LazyCodeTransformation {
    const result = new LazyCodeTransformation();
    if(this.effectCalculator.withInWholeDuration() || this.effectCalculator.isAfterPersist()) result.addDeleteLines(fromLine, count, this.effectCalculator);
    return result;
  }

}
