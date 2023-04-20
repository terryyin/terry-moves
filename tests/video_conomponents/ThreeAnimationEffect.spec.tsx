import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import { ThreeAnimationEffect } from '@/video_components/ThreeAnimationEffect';
import { AnimationContext } from '@/models/AnimationContext';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';

jest.mock('@react-three/fiber', () => ({
  ...jest.requireActual('@react-three/fiber'),
  useThree: () => {
  return {
      position: { set: jest.fn() },
      near: 0,
      far: 0,
      lookAt: jest.fn(),
  };
},
}));

describe('AnimationEffect', () => {
  let  consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });


  const renderAndGetGroup = (animationContext: AnimationContext) => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <ThreeAnimationEffect id="under-test"> </ThreeAnimationEffect>
      </AnimationContextProvider>
    );
    const group = container.querySelector('group');
    if (!group) throw new Error('Div not found');
    return group;
  };

  describe('scaleToUpperRight', () => {
    const subtitleWithAction: Subtitle = 
      { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
        { objectId: "under-test", action: '3d rise', duration: 1 },
      ] };

    [
      { sec: 0, expectedTranslateY: '-4' },
      { sec: 1, expectedTranslateY: '-0.08423119045904448' },
      { sec: 1.1, expectedTranslateY: '-0.05131653575456019' },
    ].forEach(({sec, expectedTranslateY}) => {
      test('displays the correct transformation', () => {
        const animationContext: AnimationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const group = renderAndGetGroup(animationContext);
        expect(group).toHaveAttribute('position', `0,${expectedTranslateY},0`);
      });
    });
  });
});
