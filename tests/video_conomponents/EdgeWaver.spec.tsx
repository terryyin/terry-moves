import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';
import EdgeWaver from '@/video_components/EdgeWaver';

describe('HealthBar', () => {

  const renderAndGetDiv = (animationContext: AnimationContextWrapper): HTMLDivElement => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <EdgeWaver actor="under-test" amplitudePercentageOfHeight={10} frequency={2}  />
      </AnimationContextProvider>
    );
    const div = container.querySelector<HTMLDivElement>('#under-test');
    if (!div) throw new Error('Div not found');
    return div;
  };

  describe('value change', () => {
    [
      { sec: 0.1, expectedValue: 'polygon(0% 10%,1% 11.253332335643043%' },
      { sec: 1.1, expectedValue: 'polygon(0% 11.395431146442364%,1% 12.625497482381872%' },
      { sec: 3.1, expectedValue: 'polygon(0% 19.8544972998846%,1% 19.989816961473075%' },
    ].forEach(({sec, expectedValue}) => {
      test(` at sec ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
                  { actor: 'under-test', actionType: 'additive value change to', duration: 1, value: 70 }
                ]})
                .seconds(sec)
                .please();
        const div = renderAndGetDiv(animationContext);
        expect(div.style.clipPath).toContain(expectedValue);
      });
    });
  });

});
