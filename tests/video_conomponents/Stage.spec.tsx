import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import Stage from '@/video_components/Stage';
import { AnimationContext } from '@/models/AnimationContext';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';

class AnimationContextBuilder {
  subtitle: Subtitle = 
    { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [] };

  animationContext: AnimationContext = {
    allSubtitles: [this.subtitle],
    globalFps: 30,
    globalFrame: 60,
  };

  sec(sec: number) {
    this.animationContext.globalFrame = sec * this.animationContext.globalFps;
    return this;
  }

  please() {
    return this.animationContext;
  }
}
class MakeMe {
  get animationContext() {
    return new AnimationContextBuilder();
  }
}

const makeMe = new MakeMe();

describe('Subtitles component', () => {
  test('displays the correct subtitle text when there is an active subtitle', () => {
    const animationContext: AnimationContext = makeMe.animationContext.sec(1.5).please();
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <Stage id="under-test" viewPosition={1}> </Stage>
      </AnimationContextProvider>
    );
    const div = container.querySelector('#under-test');
    if (!div) throw new Error('Div not found');
    const computedStyle = window.getComputedStyle(div);
    expect(computedStyle.getPropertyValue('width')).toBe('1%');
  });
});