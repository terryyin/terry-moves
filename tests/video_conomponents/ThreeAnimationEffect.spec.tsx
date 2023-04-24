import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import { ThreeAnimationEffect } from '@/video_components/ThreeAnimationEffect';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';

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


  const renderAndGetGroup = (animationContext: AnimationContextWrapper) => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <ThreeAnimationEffect id="under-test" cameraDistance={2}> </ThreeAnimationEffect>
      </AnimationContextProvider>
    );
    const group = container.querySelector('group');
    if (!group) throw new Error('Div not found');
    return group;
  };

  describe('3d effects default values', () => {
    [
      {tid: "1", expectScale: '1', expectRotateY: '0', expectTransY: '0' },
    ].forEach(({tid, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
        ] };
      test(`3d effect when no action specified, test id: ${tid}`, () => {
        const animationContext: AnimationContextWrapper = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .please();
        const group = renderAndGetGroup(animationContext);
        expect(group).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(group).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(group).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

  describe('3d rise', () => {
    [
      {tid: "1", sec: 0,   expectScale: '0', expectRotateY: '-6.283185307179586', expectTransY: '-4' },
      {tid: "2", sec: 1,   expectScale: '0', expectRotateY: '-6.283185307179586', expectTransY: '-4' },
      {tid: "3", sec: 1.1, expectScale: '0.1912078645890012', expectRotateY: '-5.08179086177679', expectTransY: '-3.2351685416439953' },
    ].forEach(({tid, sec, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: '3d rise', duration: 1 },
        ] };
      test(`3d effect, test id: ${tid}`, () => {
        const animationContext: AnimationContextWrapper = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const group = renderAndGetGroup(animationContext);
        expect(group).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(group).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(group).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

  describe('3d effects', () => {
    [
      {tid: "4", sec: 0,   expectScale: '1', expectRotateY: '0', expectTransY: '0' },
      {tid: "5", sec: 1,   expectScale: '1', expectRotateY: '0', expectTransY: '0' },
      {tid: "6", sec: 1.1, expectScale: '1', expectRotateY: '0.3141592653589793', expectTransY: '0' },
    ].forEach(({tid, sec, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: '3d rotate', duration: 1, totalRotation: 180 },
        ] };
      test(`3d effect, test id: ${tid}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const group = renderAndGetGroup(animationContext);
        expect(group).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(group).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(group).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

  describe('3d effects multiply', () => {
    [
      {tid: "1", sec: 0,   expectScale: '0', expectRotateY: '-6.283185307179586', expectTransY: '-4' },
      {tid: "2", sec: 1,   expectScale: '0', expectRotateY: '-6.283185307179586', expectTransY: '-4' },
      {tid: "3", sec: 1.1, expectScale: '0.1912078645890012', expectRotateY: '-4.453472331058832', expectTransY: '-3.2351685416439953' },
    ].forEach(({tid, sec, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: '3d rise', duration: 1 },
          { actor: "under-test", actionType: '3d rotate', duration: 1, totalRotation: 360 },
        ] };
      test(`3d effect, test id: ${tid}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const group = renderAndGetGroup(animationContext);
        expect(group).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(group).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(group).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

  describe('3d move', () => {
    [
      {tid: "4", sec: 0,   expectScale: '1', expectRotateY: '0', expectTransY: '0' },
      {tid: "5", sec: 1,   expectScale: '1', expectRotateY: '0', expectTransY: '0' },
      {tid: "6", sec: 1.1, expectScale: '1', expectRotateY: '0', expectTransY: '0.5736235937670036' },
    ].forEach(({tid, sec, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: '3d move', duration: 1, distances: [0, 3, 0] },
        ] };
      test(`3d effect, test id: ${tid}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const group = renderAndGetGroup(animationContext);
        expect(group).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(group).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(group).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

});
