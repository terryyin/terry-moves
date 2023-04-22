import React from 'react';
import { AnimationContextProvider } from './hooks/useAnimationContext';
import { Subtitle } from './models/Subtitles';
import autonomousComponent from './video_components/autonomousComponent';
import { AbsoluteFill } from 'remotion';
import { CustomerGroup } from './parts/CustomerGroup';
import { ValueArrow } from './parts/ValueArrow';
import { Subtitles } from './video_components/Subtitles';
import AnimationEffect from './video_components/AnimationEffect';
import { Starship } from './parts/Starship';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';
import { StarshipPlume } from './parts/StarshipPlume';

const subtitles: Subtitle[] = [
	{ leadingBlank: 1, duration: 5, text: "SpaceX is celebrating their rocket explosion,", actions: [
			{ actor: "rocket", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 0, duration: 5, text: "highlighting different attitudes towards failure in software development.", actions: [
			{ actor: "software-dev", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 1, duration: 6, text: "Learning from failures, like SpaceX's Starship test flight,", actions: [
			{ actor: "rocket", actionType: "glow", duration: 2 },
	]},
	{ leadingBlank: 0, duration: 6, text: "is more valuable than merely experiencing them.", actions: []},
	{ leadingBlank: 1, duration: 6, text: "Thomas Edison's light bulb story shows the importance of", actions: [
			{ actor: "light-bulb", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 0, duration: 6, text: "learning from each failure, not just failing repeatedly.", actions: []},
	{ leadingBlank: 1, duration: 6, text: "For software developers, error messages contain crucial information.", actions: [
			{ actor: "error-msg", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 0, duration: 6, text: "Reading and understanding them guides you to success.", actions: [
			{ actor: "success", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 1, duration: 5, text: "Improving error messages benefits your peers.", actions: [
			{ actor: "team", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 0, duration: 4, text: "In conclusion, read the error message!", actions: []},
];

export const StoryFailureVsFailure: React.FC = autonomousComponent(({frame, fps}) => {
  const animationContext  = {
    allSubtitles: subtitles,
    globalFps: fps,
    globalFrame: frame,
  };

  return (
    <AnimationContextProvider value={animationContext}>
    <AbsoluteFill style={{ backgroundColor: 'green'}}>
      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '20%', top: '0%', width: '50%', height: '100%'}}>
          <ThreeDFrame >
            <ThreeAnimationEffect id="starship" cameraDistance={30} lookAtY={16} cameraY={10}>
						<directionalLight
							castShadow
							position={[50, 100, 50]}
							intensity={200}
							color={0xffffff}
						/>	
              {/* <Starship aspectRatio={1} baseScale={1}/> */}
              <StarshipPlume aspectRatio={1} baseScale={1}/>
            </ThreeAnimationEffect>
          </ThreeDFrame>
      </AbsoluteFill>
				<CustomerGroup style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} />
				<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
					<AnimationEffect actor="value to customer">
						<ValueArrow />
					</AnimationEffect>
				</div>
			</AnimationEffect>
			<Subtitles />
    </AbsoluteFill>
    </AnimationContextProvider>
  );
});