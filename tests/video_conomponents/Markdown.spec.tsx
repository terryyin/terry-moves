import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';
import { Markdown } from '@/video_components/Markdown';

describe('CodeHighlight', () => {

  const renderAndGetDiv = (animationContext: AnimationContextWrapper, markdown: string | Record<string, string>): HTMLDivElement => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <Markdown actor="under-test" md={markdown}/>
      </AnimationContextProvider>
    );
    const div = container.querySelector<HTMLDivElement>('#under-test');
    if (!div) throw new Error('Div not found');
    return div;
  };

  describe('translation', () => {
    const animationContext = makeMe
            .animationContext
            .lang('zhCN')
            .please();

    test(`render text`, () => {
      const div = renderAndGetDiv(animationContext, "abc");
      expect(div).toHaveTextContent('abc');
    });

    test(`render translation`, () => {
      const div = renderAndGetDiv(animationContext, { en: "abc", zhCN: "def" });
      expect(div).toHaveTextContent('def');
    });

  });
});
