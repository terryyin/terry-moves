import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';
import { Markdown } from '@/video_components/Markdown';

describe('CodeHighlight', () => {

  const renderAndGetDiv = (animationContext: AnimationContextWrapper, markdown: string): HTMLDivElement => {
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
    test(`render text`, () => {
      const animationContext = makeMe
              .animationContext
              .lang('zhCN')
              .please();
      const div = renderAndGetDiv(animationContext, "abc");
      expect(div).toHaveTextContent('abc');
    });
  });
});
