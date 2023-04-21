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

describe('ThreeAnimationEffect', () => {
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

  describe('3d effects', () => {
    [
      {tid: "1", actionType: '3d rise', sec: 0,   expectScale: '0', expectRotateY: '0', expectTransY: '-4' },
      {tid: "2", actionType: '3d rise', sec: 1,   expectScale: '0', expectRotateY: '0', expectTransY: '-4' },
      {tid: "3", actionType: '3d rise', sec: 1.1, expectScale: '0.11450093245053505', expectRotateY: '0', expectTransY: '-3.54199627019786' },
      {tid: "4", actionType: '3d rotate', sec: 0,   expectScale: '0', expectRotateY: '0', expectTransY: '0' },
      {tid: "5", actionType: '3d rotate', sec: 1,   expectScale: '0', expectRotateY: '0', expectTransY: '0' },
      {tid: "6", actionType: '3d rotate', sec: 1.1, expectScale: '0.11450093245053505', expectRotateY: '0', expectTransY: '0' },
    ].forEach(({tid, actionType, sec, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { objectId: "under-test", action: actionType as '3d rise', duration: 1 },
        ] };
      test(`3d effect, test id: ${tid}`, () => {
        const animationContext: AnimationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const group = renderAndGetGroup(animationContext);
        expect(group).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(group).toHaveAttribute('rotation', `0,${expectRotateY},0`);
        expect(group).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

});
