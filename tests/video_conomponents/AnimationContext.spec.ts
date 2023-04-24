import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import { makeMe } from '../helpers/makeMe';

describe('AnimationContext', () => {

  describe('scaleToUpperLeft combined', () => {
    [
      {sec: 0,   expectPlaying: false, expectTime: 0, },
      {sec: 1,   expectPlaying: true, expectTime: 0,  },
      {sec: 1.1, expectPlaying: true, expectTime: 0.2,},
      {sec: 2.1, expectPlaying: false,expectTime: 2.1,},
    ].forEach(({sec, expectPlaying, expectTime, }) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: '3d animation start', duration: 1, speed: 2 },
        ] };

      test(`test sec: ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const result = animationContext.getGLBAnimationAttributes('under-test');
        expect(result.playing).toBe(expectPlaying);
        expect(result.time).toBe(expectTime);
      });

    });
  });
});