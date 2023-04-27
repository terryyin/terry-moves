import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';
import { CodeHighlight } from '@/video_components/CodeHighlight';

const codeString = `class Gun {
  action(isLoad) {
    if(isLoad) {
      this.load();
    }
    this.fire();
  }

  fire() {
    // ...
  }
  private load() {
    // ...
  }
}`;

describe('CodeHighlight', () => {

  const renderAndGetDiv = (animationContext: AnimationContextWrapper): HTMLDivElement => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <CodeHighlight actor="under-test" codeString={codeString} />
      </AnimationContextProvider>
    );
    const div = container.querySelector<HTMLDivElement>('#under-test');
    if (!div) throw new Error('Div not found');
    return div;
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const divOfLine = (div: HTMLDivElement, line: number) => div.querySelector(`.prism-code>:nth-child(${line})`)!;

  const styleOfLine = (div: HTMLDivElement, line: number) => window.getComputedStyle(divOfLine(div, line));

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tokenElement = (div: HTMLDivElement, line: number, token: number): HTMLSpanElement => div.querySelector(`.prism-code>:nth-child(${line})>:nth-child(${token})`)!

  describe('highlight lines', () => {
    [
      { sec: 0.1, expectedColor: '' },
      { sec: 1.1, expectedColor: 'red' },
      { sec: 3.1, expectedColor: '' },
    ].forEach(({sec, expectedColor}) => {
      test(` at sec ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
                  { actor: 'under-test', actionType: 'highlight lines', duration: 1, lines: [1, 3, 4] }
                ]})
                .seconds(sec)
                .please();
        const div = renderAndGetDiv(animationContext);
        expect(styleOfLine(div, 1).backgroundColor).toBe(expectedColor);
        expect(styleOfLine(div, 2).backgroundColor).toBe('');
        expect(styleOfLine(div, 3).backgroundColor).toBe(expectedColor);
        expect(styleOfLine(div, 4).backgroundColor).toBe(expectedColor);
      });
    });
  });

  describe('highlight token', () => {
    [
      { sec: 0.1, expectedColor: '' },
      { sec: 1.1, expectedColor: 'red' },
      { sec: 3.1, expectedColor: '' },
    ].forEach(({sec, expectedColor}) => {
      test(` at sec ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
                  { actor: 'under-test', actionType: 'highlight token', duration: 1, token: "isLoad" }
                ]})
                .seconds(sec)
                .please();
        const div = renderAndGetDiv(animationContext);
        const token = tokenElement(div, 2, 4);
        expect(token.textContent).toBe('isLoad');
        expect(token.style.backgroundColor).toBe(expectedColor);
      });
    });
  });

  describe('highlight token with style', () => {
    [
      { sec: 1.1, expectedDecoration: 'underline wavy red' },
    ].forEach(({sec, expectedDecoration}) => {
      test(` at sec ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
                  { actor: 'under-test', actionType: 'highlight token', duration: 1, token: "isLoad", style: 'wavy underline' }
                ]})
                .seconds(sec)
                .please();
        const div = renderAndGetDiv(animationContext);
        const token = tokenElement(div, 2, 4);
        expect(token.textContent).toBe('isLoad');
        expect(token.style.backgroundColor).toBe('');
        expect(token.style.textDecoration).toBe(expectedDecoration);
      });
    });
  });

  describe('highlight line with style', () => {
    [
      { sec: 1.1, expectedDecoration: 'underline wavy red' },
    ].forEach(({sec, expectedDecoration}) => {
      test(` at sec ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
                  { actor: 'under-test', actionType: 'highlight lines', duration: 1, lines: [1], style: 'wavy underline' }
                ]})
                .seconds(sec)
                .please();
        const div = renderAndGetDiv(animationContext);
        expect(styleOfLine(div, 1).textDecoration).toBe(expectedDecoration);
      });
    });
  });

  describe('replacing text', () => {
    [
      { sec: 0.5, expectedLineText: '  action(isLoad) {' },
      { sec: 1.1, expectedLineText: '  action(lo) {' },
      { sec: 1.6, expectedLineText: '  action(loadAmou) {' },
      { sec: 3.1, expectedLineText: '  action(loadAmount) {' },
    ].forEach(({sec, expectedLineText}) => {
      test(` at sec ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
                  { actor: 'under-test', actionType: 'replace text', duration: 1, line: 2, match: 'isLoad', replacement: 'loadAmount' }
                ]})
                .seconds(sec)
                .please();
        const div = renderAndGetDiv(animationContext);
        expect(divOfLine(div, 2).textContent).toBe(expectedLineText);
      });
    });
  });

});
