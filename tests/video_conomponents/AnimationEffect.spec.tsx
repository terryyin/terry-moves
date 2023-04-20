import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import AnimationEffect from '@/video_components/AnimationEffect';
import { AnimationContext } from '@/models/AnimationContext';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';

describe('AnimationEffect', () => {
  const renderAndGetDivStyle = (animationContext: AnimationContext) => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <AnimationEffect id="under-test"> </AnimationEffect>
      </AnimationContextProvider>
    );
    const div = container.querySelector('#under-test');
    if (!div) throw new Error('Div not found');
    return window.getComputedStyle(div);
  };

  describe('scaleToUpperRight', () => {
    const subtitleWithAction: Subtitle = 
      { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
        { objectId: "under-test", action: 'scaleToUpperRight', duration: 1, outputRange: [50, 100] },
      ] };

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

    test('find the action in the first subtitle but its second action', () => {
    const subtitleWithAction: Subtitle = 
      { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
        { objectId: "other-object", action: 'scaleToUpperRight', duration: 1, outputRange: [0, 1] },
        { objectId: "under-test", action: 'scaleToUpperRight', duration: 1, outputRange: [50, 100] },
      ] };
      const animationContext: AnimationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(1.1)
                .please();
      const computedStyle = renderAndGetDivStyle(animationContext);
      expect(computedStyle.getPropertyValue('width')).toBe('55%');
    });
  });

  describe('appear and disappear', () => {

    [
      { actionType: 'appear', sec: 0, expectedOpacity: '0' },
      { actionType: 'appear', sec: 1, expectedOpacity: '0' },
      { actionType: 'appear', sec: 1.1, expectedOpacity: '0.1' },
      { actionType: 'disappear', sec: 0, expectedOpacity: '1' },
      { actionType: 'disappear', sec: 1, expectedOpacity: '1' },
      { actionType: 'disappear', sec: 1.1, expectedOpacity: '0.9' },
    ].forEach(({actionType, sec, expectedOpacity}) => {
      const subtitleWithAction: Subtitle = 
        { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { objectId: "under-test", action: actionType as 'appear' | 'disappear', duration: 1 },
        ] };

      test('displays the correct transformation', () => {
        const animationContext: AnimationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const computedStyle = renderAndGetDivStyle(animationContext);
        expect(computedStyle.getPropertyValue('opacity')).toBe(expectedOpacity);
      });
    });
  });
});