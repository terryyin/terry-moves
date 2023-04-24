import React from 'react';
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { Subtitles } from './video_components/Subtitles';
import AnimationEffect from './video_components/AnimationEffect';
import { Starship } from './parts/Starship';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';
import { StarshipPlume } from './parts/StarshipPlume';
import { Explosion } from './parts/Explosion';
import { GroupInitialState } from './video_components/GroupInitialState';
import { OddeLogo } from './parts/OddeLogo';
import { OddeLogoInner } from './parts/OddeLogoInner';
import { FlipCoin } from './video_components/AutonomousComponents/FlipCoin';
import { Story } from './video_components/Story';

const storyFailureVsFailureSubtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 3, scale: 1.5, position: 'center', text: [
			"Learning by Failures",
			"vs.",
			"Learning from Failures",
		],
	  flashBack: {from: 40, duration: 3, speed: 0.5} },

	{ leadingBlank: 0.5, duration: 2.5, text: "SpaceX is celebrating their rocket explosion,", actions: [
			{ actor: "starship", actionType: "3d rise", duration: 3 },
			{ actor: "starship", actionType: "3d ocillating", duration: 10, unit: 0.1 },
	]},
	{ leadingBlank: 0, duration: 3.5, text: "highlighting different attitudes towards failure in software development.", actions: [
			{ actor: "blue background", actionType: "disappear", duration: 5 },
			{ actor: "starship", actionType: "3d going up", duration: 5, unit: 20 },
			{ actor: "starship", actionType: "3d camera up", duration: 6, unit: 5 },
			{ actor: "starship", actionType: "3d camera closer", duration: 6, unit: -20 },
			{ actor: "software-dev", actionType: "appear", duration: 1 },
	]},

	{ leadingBlank: 0.5, duration: 2.5, text: "Just by failing repeatedly,", actions: [
			{ actor: "starship", actionType: "3d rotate", duration: 20, totalRotation: 240 },
			{ actor: "explosion", actionType: "3d animation start", duration: 2, speed: 0.5 },
	]},
	{ leadingBlank: 0, duration: 1, text: "like in Thomas Edison's light bulb story,", actions: [
			{ actor: "explosion", actionType: "3d animation start", duration: 1, speed: 1 },
	]},
	{ leadingBlank: 0, duration: 1, text: "like in Thomas Edison's light bulb story,", actions: [
			{ actor: "explosion", actionType: "3d animation start", duration: 1, speed: 1 },
	]},
	{ leadingBlank: 0, duration: 3, text: "not necessarily lead to success.", actions: [
	]},


	{ leadingBlank: 0.5, duration: 3, text: "Learning from the failure", actions: [
			{ actor: "explosion", actionType: "3d animation reverse", duration: 1, speed: 1, percentage: 50, pauseAtEnd: true },
	]},
	{ leadingBlank: 0, duration: 3, text: "is more valuable than merely experiencing them.", actions: [
	]},
	{ leadingBlank: 0.5, duration: 3, text: "For software developers, error messages contain crucial information.", actions: [
			{ actor: "error-msg", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 0, duration: 3, text: "Reading and understanding them makes sure you solve the right problem.", actions: [
			{ actor: "success", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 0.5, duration: 3, text: "Improving error messages benefits your peers.", actions: [
			{ actor: "team", actionType: "appear", duration: 1 },
	]},
	{ leadingBlank: 0, duration: 2, text: "In conclusion,", actions: []},
	{ leadingBlank: 0, duration: 5, text: "read the error message!", scale: 3, position: 'center', actions: []},
];

export const StoryFailureVsFailure: React.FC = () => {
  return (
		<Story id="StoryFailureVsFailure" subtitles={storyFailureVsFailureSubtitles}  >
    <AbsoluteFill style={{ backgroundColor: '#19bdff'}}>
      <AnimationEffect actor="blue background">
        <AbsoluteFill style={{ backgroundColor: '#b9ebff'}}/>
			</AnimationEffect>
      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ThreeDFrame >
						<directionalLight
							castShadow
							position={[50, 100, 50]}
							intensity={200}
							color={0xffffff}
						/>	
            <ThreeAnimationEffect id="starship" cameraDistance={30} lookAtY={16} cameraY={10}>
              <Starship/>
              <StarshipPlume/>
              <GroupInitialState position={[0, 0, 0]} scale={0.2} >
                <Explosion actor="explosion" />
							</GroupInitialState>
            </ThreeAnimationEffect>
          </ThreeDFrame>
      </AbsoluteFill>
			</AnimationEffect>
			<Subtitles scale={2} />
    </AbsoluteFill>
    <AbsoluteFill style={{ left: '86%', top: '9%', width: '10%', height: '20%'}}>
			<span style={{fontSize: '28px'}}>terry@</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '90%', top: '2%', width: '10%', height: '20%'}}>
			<OddeLogo />
			<FlipCoin speed={2} interval={4} shift={1} >
			  <OddeLogoInner />
			</FlipCoin>
		</AbsoluteFill>
		</Story>
  );
};