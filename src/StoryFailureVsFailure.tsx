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
import { Explosion } from './parts/Explosion';
import { GroupInitialState } from './video_components/GroupInitialState';

const subtitles: Subtitle[] = [
	{ leadingBlank: 2, duration: 4, text: "SpaceX is celebrating their rocket explosion,", actions: [
			{ actor: "starship", actionType: "3d rise", duration: 3 },
			{ actor: "starship", actionType: "3d ocillating", duration: 300, unit: 0.1 },
	]},
	{ leadingBlank: 0, duration: 5, text: "highlighting different attitudes towards failure in software development.", actions: [
			{ actor: "starship", actionType: "3d going up", duration: 5, unit: 30 },
			{ actor: "starship", actionType: "3d camera up", duration: 6, unit: 15 },
			{ actor: "software-dev", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 1, duration: 3, text: "Learning from failures,", actions: [
			{ actor: "starship", actionType: "3d rotate", duration: 10, totalRotation: 90 },
			{ actor: "explosion", actionType: "3d animation start", duration: 2, speed: 0.5 },
	]},

	{ leadingBlank: 1, duration: 6, text: "like SpaceX's Starship test flight,", actions: [
			{ actor: "explosion", actionType: "3d animation reverse", duration: 2, speed: 0.5, percentage: 30 },
	]},

	{ leadingBlank: 0, duration: 6, text: "is more valuable than merely experiencing them.", actions: [

	]},
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
              <Starship/>
              <StarshipPlume/>
              <GroupInitialState position={[0, 0, 0]} scale={0.2} >
                <Explosion actor="explosion" />
							</GroupInitialState>
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