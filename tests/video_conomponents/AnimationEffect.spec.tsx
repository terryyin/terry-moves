import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import AnimationEffect from '@/video_components/AnimationEffect';
import { AnimationContext } from '@/models/AnimationContext';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';

describe('AnimationEffect', () => {

  const renderAndGetDiv = (animationContext: AnimationContext): HTMLDivElement => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <AnimationEffect id="under-test"> </AnimationEffect>
      </AnimationContextProvider>
    );
    const div = container.querySelector<HTMLDivElement>('#under-test');
    if (!div) throw new Error('Div not found');
    return div;
  };

  const renderAndGetDivStyle = (animationContext: AnimationContext) => {
    return window.getComputedStyle(renderAndGetDiv(animationContext));
  };

  describe('scaleToUpperRight', () => {
    const subtitleWithAction: Subtitle = 
      { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
        { objectId: "under-test", action: 'scaleToUpperRight', duration: 1, outputRange: [50, 100] },
      ] };

    test('default value when no action specified', () => {
      const animationContext: AnimationContext = makeMe
              .animationContext
              .withSubtitle({ id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.'})
              .please();
      const computedStyle = renderAndGetDivStyle(animationContext);
      expect(computedStyle.getPropertyValue('width')).toBe("100%");
    });

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

  describe('appear and disappear in sequence', () => {
    [
      { sec: 0, expectedOpacity: '0' },
      { sec: 1.1, expectedOpacity: '0.1' },
      { sec: 4.1, expectedOpacity: '1' },
      { sec: 5.1, expectedOpacity: '0.9' },
      { sec: 8.1, expectedOpacity: '0' },
    ].forEach(({sec, expectedOpacity}) => {
      test(`appear, then disappear at sec ${sec}`, () => {
        const subtitleWithActionAppear: Subtitle = 
        { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { objectId: "under-test", action: 'appear', duration: 1 },
        ] };
        const subtitleWithActionDisappear: Subtitle = 
        { id: 'subtitle2', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { objectId: "under-test", action: 'disappear', duration: 1 },
        ] };
        const animationContext: AnimationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithActionAppear)
                .withSubtitle(subtitleWithActionDisappear)
                .seconds(sec)
                .please();
        const computedStyle = renderAndGetDivStyle(animationContext);
        expect(computedStyle.getPropertyValue('opacity')).toBe(expectedOpacity);
      });
    });
  });

  describe('appear and disappear overlapped', () => {
    [
      { sec: 5.1, expectedOpacity: '0.9' },
      { sec: 8.1, expectedOpacity: '0' },
    ].forEach(({sec, expectedOpacity}) => {
      test(`appear, then disappear at sec ${sec}`, () => {
        const subtitleWithActionAppear: Subtitle = 
        { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { objectId: "under-test", action: 'appear', duration: 5 },
        ] };
        const subtitleWithActionDisappear: Subtitle = 
        { id: 'subtitle2', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { objectId: "under-test", action: 'disappear', duration: 1 },
        ] };
        const animationContext: AnimationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithActionAppear)
                .withSubtitle(subtitleWithActionDisappear)
                .seconds(sec)
                .please();
        const computedStyle = renderAndGetDivStyle(animationContext);
        expect(computedStyle.getPropertyValue('opacity')).toBe(expectedOpacity);
      });
    });
  });

  describe('glow', () => {
    [
      { sec: 0, shadowExist: true, expectedOpacity: '0.9' },
      { sec: 1.1, shadowExist: true, expectedOpacity: '0' },
      { sec: 4.1, shadowExist: true, expectedOpacity: '0' },
    ].forEach(({sec, shadowExist, }) => {
      test(`appear, then disappear at sec ${sec}`, () => {
        const subtitle: Subtitle = 
        { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { objectId: "under-test", action: 'glow', duration: 5 },
        ] };
        const animationContext: AnimationContext = makeMe
                .animationContext
                .withSubtitle(subtitle)
                .seconds(sec)
                .please();
        const div = renderAndGetDiv(animationContext);
        const shadow = div.nextElementSibling;
        expect(Boolean(shadow)).toBe(shadowExist);
        if(shadowExist) {
          // Const computedStyle = renderAndGetDivStyle(shadow);
          // Expect(computedStyle.getPropertyValue('opacity')).toBe(expectedOpacity);
        }
      });
    });
  });

});