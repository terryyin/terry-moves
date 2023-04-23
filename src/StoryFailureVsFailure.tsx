import React from 'react';
import { AnimationContextProvider } from './hooks/useAnimationContext';
import { Subtitle } from './models/Subtitles';
import autonomousComponent from './video_components/autonomousComponent';
import { AbsoluteFill } from 'remotion';
import { Subtitles } from './video_components/Subtitles';
import AnimationEffect from './video_components/AnimationEffect';
import { Starship } from './parts/Starship';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';
import { StarshipPlume } from './parts/StarshipPlume';
import { Explosion } from './parts/Explosion';
import { GroupInitialState } from './video_components/GroupInitialState';

const subtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 2, text: "SpaceX is celebrating their rocket explosion,",
	  flashBack: {from: 40, duration: 2, speed: 1} },

	{ leadingBlank: 2, duration: 4, text: "SpaceX is celebrating their rocket explosion,", actions: [
			{ actor: "starship", actionType: "3d rise", duration: 3 },
			{ actor: "starship", actionType: "3d ocillating", duration: 10, unit: 0.1 },
	]},
	{ leadingBlank: 0, duration: 5, text: "highlighting different attitudes towards failure in software development.", actions: [
			{ actor: "blue background", actionType: "disappear", duration: 5 },
			{ actor: "starship", actionType: "3d going up", duration: 5, unit: 20 },
			{ actor: "starship", actionType: "3d camera up", duration: 6, unit: 5 },
			{ actor: "starship", actionType: "3d camera closer", duration: 6, unit: -20 },
			{ actor: "software-dev", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 1, duration: 3, text: "Learning from failures,", actions: [
			{ actor: "starship", actionType: "3d rotate", duration: 20, totalRotation: 240 },
			{ actor: "explosion", actionType: "3d animation start", duration: 2, speed: 0.5 },
	]},

	{ leadingBlank: 1, duration: 6, text: "like SpaceX's Starship test flight,", actions: [
	]},

	{ leadingBlank: 0, duration: 6, text: "is more valuable than merely experiencing them.", actions: [
			{ actor: "explosion", actionType: "3d animation reverse", duration: 1, speed: 1, percentage: 50, pauseAtEnd: true },

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
    <AbsoluteFill style={{ backgroundColor: '#19bdff'}}>
      <AnimationEffect actor="blue background">
        <AbsoluteFill style={{ backgroundColor: '#b9ebff'}}/>
			</AnimationEffect>
      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
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
			</AnimationEffect>
			<Subtitles />
    </AbsoluteFill>
    </AnimationContextProvider>
  );
});