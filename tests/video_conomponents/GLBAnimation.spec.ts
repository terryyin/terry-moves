import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import { AnimationContext } from '@/models/AnimationContext';
import { makeMe } from '../helpers/makeMe';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';

describe('ThreeAnimationEffect', () => {

  describe('3d animation start', () => {
    [
      {sec: 0,   expectPlaying: false, expectTime: 0, expectOnceOnly: false},
      {sec: 1,   expectPlaying: true, expectTime: 0, expectOnceOnly: false},
      {sec: 1.1, expectPlaying: true, expectTime: 0.1,  expectOnceOnly: false},
      {sec: 2.1, expectPlaying: false,expectTime: 1.1,  expectOnceOnly: false},
    ].forEach(({sec, expectPlaying, expectTime, expectOnceOnly}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: '3d animation start', duration: 1 },
        ] };

      test(`test sec: ${sec}`, () => {
        const animationContext: AnimationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const animationContextWrapper = new AnimationContextWrapper(animationContext);
        const result = animationContextWrapper.getGLBAnimationAttributes('under-test');
        expect(result.playing).toBe(expectPlaying);
        expect(result.time).toBe(expectTime);
        expect(result.loopOnce).toBe(expectOnceOnly);
      });
    });
  });
});