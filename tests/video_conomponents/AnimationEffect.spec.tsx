import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import AnimationEffect from '@/video_components/AnimationEffect';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';

describe('AnimationEffect', () => {

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

  describe('scaleToUpperRight', () => {
    const subtitleWithAction: Subtitle = 
      { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
        { actor: "under-test", actionType: 'scale', duration: 1, outputRange: [0.5, 1] },
        { actor: "under-test", actionType: 'move', duration: 1, absolutePosition: 50 },
      ] };

    test('default value when no action specified', () => {
      const animationContext = makeMe
              .animationContext
              .withSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.'})
              .please();
      const computedStyle = renderAndGetDivStyle(animationContext);
      expect(computedStyle.getPropertyValue('transform')).toBe("scale(1) translateX(0px) translateY(0px) translateZ(0px)");
    });

    [
      { sec: 0, expectedWidth: 'scale(0.5) translateX(0px) translateY(0px)' },
      { sec: 1, expectedWidth: 'scale(0.5) translateX(0px) translateY(0px)' },
      { sec: 1.1, expectedWidth: 'scale(0.5956039322945006) translateX(9.56039322945006px) translateY(0px)' },
    ].forEach(({sec, expectedWidth}) => {
      test('displays the correct transformation', () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const computedStyle = renderAndGetDivStyle(animationContext);
        expect(computedStyle.getPropertyValue('transform')).toContain(expectedWidth);
      });
    });

    test('return default value when there is not action defined for the objectId', () => {
      const animationContext = makeMe
                .animationContext
                .seconds(1)
                .please();
      const computedStyle = renderAndGetDivStyle(animationContext);
      expect(computedStyle.getPropertyValue('transform')).toBe('scale(1) translateX(0px) translateY(0px) translateZ(0px)');
    });

    test('find the action in the second subtitle', () => {
      const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 3, text: 'before first subtitle.'})
                .withSubtitle(subtitleWithAction)
                .seconds(1)
                .please();
      const computedStyle = renderAndGetDivStyle(animationContext);
      expect(computedStyle.getPropertyValue('transform')).toContain('scale(0.5) translateX(0px) translateY(0px)');
    });

    test('find the action in the second subtitle should act at the right time', () => {
      const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 3, text: 'before first subtitle.'})
                .withSubtitle(subtitleWithAction)
                .seconds(5.1)
                .please();
      const computedStyle = renderAndGetDivStyle(animationContext);
      expect(computedStyle.getPropertyValue('transform')).toContain('scale(0.5956039322945006) translateX(9.56039322945006px) translateY(0px)');
    });

    test('find the action in the first subtitle but its second action', () => {
    const subtitleWithAction: Subtitle = 
      { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
        { actor: "other-object", actionType: 'scale', duration: 1, outputRange: [0, 1] },
        { actor: "under-test", actionType: 'scale', duration: 1, outputRange: [50, 100] },
      ] };
      const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(1.1)
                .please();
      const computedStyle = renderAndGetDivStyle(animationContext);
      expect(computedStyle.getPropertyValue('transform')).toContain('scale(59.56039322945006)');
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
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: actionType as 'appear' | 'disappear', startDuration: 1 },
        ] };
      test('displays the correct transformation', () => {
        const animationContext = makeMe
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
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: 'appear', startDuration: 1 },
        ] };
        const subtitleWithActionDisappear: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: 'disappear', startDuration: 1 },
        ] };
        const animationContext = makeMe
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
      { sec: 5.1, expectedOpacity: '0.7926666666666666' },
      { sec: 8.1, expectedOpacity: '0' },
    ].forEach(({sec, expectedOpacity}) => {
      test(`appear, then disappear at sec ${sec}`, () => {
        const subtitleWithActionAppear: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: 'appear', startDuration: 5 },
        ] };
        const subtitleWithActionDisappear: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: 'disappear', startDuration: 3 },
        ] };
        const animationContext = makeMe
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
      { sec: 0, shadowExist: false, expectedOpacity: undefined },
      { sec: 1.1, shadowExist: true, expectedOpacity: '0.9', expectedTransform: 'scale(1.02)' },
      { sec: 5.1, shadowExist: false, expectedOpacity: undefined },
    ].forEach(({sec, shadowExist, expectedOpacity, expectedTransform}) => {
      test(`glow at sec ${sec}`, () => {
        const subtitle: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: 'glow', duration: 1 },
        ] };
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitle)
                .seconds(sec)
                .please();
        const div = renderAndGetDiv(animationContext);
        const shadow = div.nextElementSibling;
        expect(Boolean(shadow)).toBe(shadowExist);
        if(shadow) {
          const computedStyle = window.getComputedStyle(shadow);
          expect(computedStyle.getPropertyValue('opacity')).toBe(expectedOpacity);
          expect(computedStyle.getPropertyValue('transform')).toContain(expectedTransform);
        }
      });
    });
  });

  describe('appear then glow', () => {
    [
      { sec: 0.1, expectedOpacity: '0' },
      { sec: 1.1, expectedOpacity: '0.1' },
    ].forEach(({sec, expectedOpacity}) => {
      test(`appear, then disappear at sec ${sec}`, () => {
        const subtitleWithActionAppear: Subtitle = 
        { leadingBlank: 1, duration: 2, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: 'appear', startDuration: 1 },
        ] };
        const subtitleWithActionGlow: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: 'glow', duration: 1 },
        ] };
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithActionAppear)
                .withSubtitle(subtitleWithActionGlow)
                .seconds(sec)
                .please();
        const computedStyle = renderAndGetDivStyle(animationContext);
        expect(computedStyle.getPropertyValue('opacity')).toBe(expectedOpacity);
      });
    });
  });

});