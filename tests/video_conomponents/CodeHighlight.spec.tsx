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
  const styleOfLine = (div: HTMLDivElement, line: number) => window.getComputedStyle(div.querySelector(`.prism-code>:nth-child(${line})`)!);

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
});
