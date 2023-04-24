import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import AnimationEffect from '@/video_components/AnimationEffect';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';

describe('Flash back', () => {

  const renderAndGetDiv = (animationContext: AnimationContextWrapper): HTMLDivElement => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <AnimationEffect actor="under-test"> </AnimationEffect>
      </AnimationContextProvider>
    );
    const div = container.querySelector<HTMLDivElement>('#under-test');
    if (!div) throw new Error('Div not found');
    return div;
  };

  const renderAndGetDivStyle = (animationContext: AnimationContextWrapper) => {
    return window.getComputedStyle(renderAndGetDiv(animationContext));
  };

  describe('flash back', () => {
    const subtitleWithAction: Subtitle = 
      { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
        { actor: "under-test", actionType: 'scaleToUpperRight', duration: 1, outputRange: [50, 100] },
      ] };

    [
      { sec: 0.5, expectedWidth: '50%' },
      { sec: 1.1, expectedWidth: '52.5%' },
      { sec: 1.6, expectedWidth: '50%' },
    ].forEach(({sec, expectedWidth}) => {
      test(`test for sec ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 1, text: '', flashBack: {from: 3, duration: 0.5, speed: 0.5} })
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const computedStyle = renderAndGetDivStyle(animationContext);
        expect(computedStyle.getPropertyValue('width')).toBe(expectedWidth);
      });
    });
  });
});
