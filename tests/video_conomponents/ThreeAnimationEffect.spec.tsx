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
        <ThreeAnimationEffect actor="under-test" > </ThreeAnimationEffect>
      </AnimationContextProvider>
    );
    const group = container.querySelector('group');
    if (!group) throw new Error('group not found');

    const positionGroup = group;
    const initialPositionGroup = positionGroup.querySelector('group');
    if (!initialPositionGroup) throw new Error('Initial position group not found');
    const rotationGroup = initialPositionGroup.querySelector('group');
    if (!rotationGroup) throw new Error('rotation group not found');
    const scaleAndIntialRotationGroup = rotationGroup.querySelector('group');
    if (!scaleAndIntialRotationGroup) throw new Error('scale and initial rotation group not found');
    return { group, positionGroup, initialPositionGroup, rotationGroup, scaleAndIntialRotationGroup };
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
        const { positionGroup, rotationGroup, scaleAndIntialRotationGroup } = renderAndGetGroup(animationContext);
        expect(positionGroup).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(rotationGroup).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(scaleAndIntialRotationGroup).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

  describe('rotate and rise', () => {
    [
      {tid: "1", sec: 0,   expectScale: '0', expectRotateY: '-6.283185307179586', expectTransY: '-4' },
      {tid: "2", sec: 1,   expectScale: '0', expectRotateY: '-6.283185307179586', expectTransY: '-4' },
      {tid: "3", sec: 1.1, expectScale: '0.1912078645890012', expectRotateY: '-5.08179086177679', expectTransY: '-3.2351685416439953' },
    ].forEach(({tid, sec, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: 'rotate and rise', duration: 1, value: 4 },
        ] };
      test(`3d effect, test id: ${tid}`, () => {
        const animationContext: AnimationContextWrapper = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const { positionGroup, rotationGroup, scaleAndIntialRotationGroup } = renderAndGetGroup(animationContext);
        expect(positionGroup).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(rotationGroup).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(scaleAndIntialRotationGroup).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

  describe('3d effects', () => {
    [
      {tid: "4", sec: 0,   expectScale: '1', expectRotateY: '0', expectTransY: '0' },
      {tid: "5", sec: 1,   expectScale: '1', expectRotateY: '0', expectTransY: '0' },
      {tid: "6", sec: 1.1, expectScale: '1', expectRotateY: '0.600697222701398', expectTransY: '0' },
    ].forEach(({tid, sec, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 180, 0] },
        ] };
      test(`3d effect, test id: ${tid}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const { positionGroup, rotationGroup, scaleAndIntialRotationGroup } = renderAndGetGroup(animationContext);
        expect(positionGroup).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(rotationGroup).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(scaleAndIntialRotationGroup).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

  describe('3d rotate and back', () => {
    [
      {sec: 0,   expectScale: '1', expectRotateY: '0', expectTransY: '0' },
      {sec: 1,   expectScale: '1', expectRotateY: '0', expectTransY: '0' },
      {sec: 1.1, expectScale: '1', expectRotateY: '0.600697222701398', expectTransY: '0' },
      {sec: 10.1, expectScale: '1', expectRotateY: '2.540895430888395', expectTransY: '0' },
    ].forEach(({sec, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: '3d rotate and back', startDuration: 1, endDuration: 1, endingTimeAdjustment: 10, totalRotation: [0, 180, 0] },
        ] };
      test(`3d effect, test sec: ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const { positionGroup, rotationGroup, scaleAndIntialRotationGroup } = renderAndGetGroup(animationContext);
        expect(positionGroup).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(rotationGroup).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(scaleAndIntialRotationGroup).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

  describe('3d effects multiply', () => {
    [
      {tid: "1", sec: 0,   expectScale: '0', expectRotateY: '-6.283185307179586', expectTransY: '-4' },
      {tid: "2", sec: 1,   expectScale: '0', expectRotateY: '-6.283185307179586', expectTransY: '-4' },
      {tid: "3", sec: 1.1, expectScale: '0.1912078645890012', expectRotateY: '-3.880396416373994', expectTransY: '-3.2351685416439953' },
    ].forEach(({tid, sec, expectScale, expectRotateY, expectTransY}) => {
      const subtitleWithAction: Subtitle = 
        { leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
          { actor: "under-test", actionType: 'rotate and rise', duration: 1, value: 4 },
          { actor: "under-test", actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 360, 0] },
        ] };
      test(`3d effect, test id: ${tid}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();

        const { positionGroup, rotationGroup, scaleAndIntialRotationGroup } = renderAndGetGroup(animationContext);
        expect(positionGroup).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(rotationGroup).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(scaleAndIntialRotationGroup).toHaveAttribute('scale', `${expectScale}`);
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
          { actor: "under-test", actionType: 'move', duration: 1, absolutePosition: [0, 3, 0] },
        ] };
      test(`3d effect, test id: ${tid}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle(subtitleWithAction)
                .seconds(sec)
                .please();
        const { positionGroup, rotationGroup, scaleAndIntialRotationGroup } = renderAndGetGroup(animationContext);
        expect(positionGroup).toHaveAttribute('position', `0,${expectTransY},0`);
        expect(rotationGroup).toHaveAttribute('rotation', `0,${expectRotateY},0,XYZ`);
        expect(scaleAndIntialRotationGroup).toHaveAttribute('scale', `${expectScale}`);
      });
    });
  });

});
