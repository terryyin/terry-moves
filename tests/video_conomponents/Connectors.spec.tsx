import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';
import { makeMe } from '../helpers/makeMe';
import AnimationContextWrapper from '@/models/AnimationContextWrapper';
import { Connectors } from '@/video_components/private/Connectors';
import { AbsoluteFill } from 'remotion';
import { Anchor } from '@/video_components/Anchor';
import { stubBoundingClientRect, BoundingClientRectStubber } from '@/video_components/hoc/BoundingClientRectOf';
import stringToValidHtmlId from '@/models/stringToValidHtmlId';

describe('Connectors', () => {

  const renderAndGetSvgPath = (animationContext: AnimationContextWrapper, boundingClientRectOf: BoundingClientRectStubber): HTMLElement => {
    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <AbsoluteFill style={{left: 0, right: 0, width: "100px", height: "100px"}}>
          <Connectors boundingClientRectOf={boundingClientRectOf}/>
          <AbsoluteFill style={{left: "50%", top: "50%", width: "30%", height: "30%"}}>
            <Anchor actor="start point" style={{left: "5%", top: "50%" }}/>
            <Anchor actor="end point" style={{left: "10%", top: "70%" }}/>
          </AbsoluteFill>
        </AbsoluteFill>
      </AnimationContextProvider>
    );
    return container;
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const svgPath = (div: HTMLElement): SVGPathElement => div.querySelector(`svg path`)!;

  describe('connecting', () => {
    let boundingClientRectStub: BoundingClientRectStubber;
    
    beforeEach(() => {
      boundingClientRectStub = stubBoundingClientRect();
      boundingClientRectStub.stub({ left: 10, top: 10, width: 100, height: 100 }, (e)=>Boolean(e.querySelector(`svg`)));
      boundingClientRectStub.stub({ left: 15, top: 50, width: 1, height: 1 }, (e)=>Boolean(e.id ===stringToValidHtmlId(`start point`)));
      boundingClientRectStub.stub({ left: 20, top: 70, width: 1, height: 1 }, (e)=>Boolean(e.id ===stringToValidHtmlId(`end point`)));
    });

    [
      { sec: 0.1, expectedValue: undefined},
      { sec: 1.1, expectedValue: 'M15.5,50.5 Q-11.104275004359955,67.77606875109 20.5,70.5' },
      { sec: 3.1, expectedValue: undefined},
    ].forEach(({sec, expectedValue}) => {
      test(` at sec ${sec}`, () => {
        const animationContext = makeMe
                .animationContext
                .withSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.', actions: [
                  { actor: 'start point', actionType: 'connect to', persistTime: 1, target: 'end point', bentLevel: 30 }
                ]})
                .seconds(sec)
                .please();
        const path = renderAndGetSvgPath(animationContext, boundingClientRectStub);
        expect(svgPath(path)?.getAttribute("d")).toBe(expectedValue);
      });
    });
  });

});
