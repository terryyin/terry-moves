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
        <EdgeWaver actor="under-test" sides={[]} />
      </AnimationContextProvider>
    );
    const div = container.querySelector<HTMLDivElement>('#under-test');
    if (!div) throw new Error('Div not found');
    return div;
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const divOfHealthBar = (div: HTMLDivElement): HTMLDivElement => div.querySelector(`div>:nth-child(${3})`)!;

  describe('value change', () => {
    [
      { sec: 0.1, expectedValue: '100%' },
      { sec: 1.1, expectedValue: '7%' },
      { sec: 3.1, expectedValue: '70%' },
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
        expect(divOfHealthBar(div).style.width).toBe(expectedValue);
      });
    });
  });

});
