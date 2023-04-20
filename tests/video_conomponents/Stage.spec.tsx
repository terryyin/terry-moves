import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import Stage from '@/video_components/Stage1';
import { AnimationContext } from '@/models/AnimationContext';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';

class AnimationContextBuilder {

  animationContext: AnimationContext = {
    allSubtitles: [],
    globalFps: 30,
    globalFrame: 60,
  };

  withSubtitle(subtitle: Subtitle) {
    this.animationContext.allSubtitles.push(subtitle);
    return this;
  }

  seconds(sec: number) {
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
  const subtitleWithAction: Subtitle = 
    { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
      { objectId: "under-test", action: 'scaleToUpperRight', duration: 1, outputRange: [50, 100] },
    ] };

  const renderAndGetDivStyle = (animationContext: AnimationContext) => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <Stage id="under-test"> </Stage>
      </AnimationContextProvider>
    );
    const div = container.querySelector('#under-test');
    if (!div) throw new Error('Div not found');
    return window.getComputedStyle(div);
  };

  [
    { sec: 0, expectedWidth: '50%' },
    { sec: 1, expectedWidth: '50%' },
    { sec: 1.1, expectedWidth: '55%' },
  ].forEach(({sec, expectedWidth}) => {
    test('displays the correct transformation', () => {
      const animationContext: AnimationContext = makeMe
               .animationContext
               .withSubtitle(subtitleWithAction)
               .seconds(sec)
               .please();
      const computedStyle = renderAndGetDivStyle(animationContext);
      expect(computedStyle.getPropertyValue('width')).toBe(expectedWidth);
    });

  });

  test('return default value when there is not action defined for the objectId', () => {
    const animationContext: AnimationContext = makeMe
              .animationContext
              .seconds(1)
              .please();
    const computedStyle = renderAndGetDivStyle(animationContext);
    expect(computedStyle.getPropertyValue('width')).toBe('100%');
  });

  test('find the action in the second subtitle', () => {
    const animationContext: AnimationContext = makeMe
              .animationContext
              .withSubtitle({ id: 'subtitle2', leadingBlank: 1, duration: 3, text: 'before first subtitle.'})
              .withSubtitle(subtitleWithAction)
              .seconds(1)
              .please();
    const computedStyle = renderAndGetDivStyle(animationContext);
    expect(computedStyle.getPropertyValue('width')).toBe('50%');
  });

  test('find the action in the second subtitle should act at the right time', () => {
    const animationContext: AnimationContext = makeMe
              .animationContext
              .withSubtitle({ id: 'subtitle2', leadingBlank: 1, duration: 3, text: 'before first subtitle.'})
              .withSubtitle(subtitleWithAction)
              .seconds(5.1)
              .please();
    const computedStyle = renderAndGetDivStyle(animationContext);
    expect(computedStyle.getPropertyValue('width')).toBe('55%');
  });

});