import {Audio} from 'remotion'
import React from 'react';
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill, staticFile } from 'remotion';
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
import { ProblemDomain } from './parts/ProblemDomain';

const subtitles: Subtitle[] = [
	{
			leadingBlank: 1,
			duration: 4,
			text: "Welcome to our video on why boolean parameters are bad.",
			actions: [
					{ actor: "title", actionType: "appear", duration: 1 },
			],
	},
	{
			leadingBlank: 0,
			duration: 4,
			text: "Let's look at an example of a function with a boolean parameter:",
			actions: [
					{ actor: "example1", actionType: "appear", duration: 1 },
			],
	},
	{
			leadingBlank: 0,
			duration: 4,
			text: "gun.action(true); and gun.action(false);",
			actions: [
					{ actor: "example1", actionType: "highlight", duration: 2 },
			],
	},
	{
			leadingBlank: 1,
			duration: 4,
			text: "The implementation might look like this:",
			actions: [
					{ actor: "example2", actionType: "appear", duration: 1 },
			],
	},
	{
			leadingBlank: 0,
			duration: 4,
			text: "class Gun { action(isLoad) { this.fire(); if(isLoad) this.load(); }}",
			actions: [
					{ actor: "example2", actionType: "highlight", duration: 2 },
			],
	},
	{
			leadingBlank: 1,
			duration: 4,
			text: "We can refactor the code to improve coupling and cohesion.",
			actions: [
					{ actor: "refactor", actionType: "appear", duration: 1 },
			],
	},
	{
			leadingBlank: 0,
			duration: 4,
			text: "Change the functions to gun.fire() and gun.load().",
			actions: [
					{ actor: "refactor", actionType: "highlight", duration: 2 },
			],
	},
	{
			leadingBlank: 1,
			duration: 4,
			text: "This reduces complexity and dependencies, resulting in lower coupling.",
			actions: [
					{ actor: "benefits", actionType: "appear", duration: 1 },
			],
	},
	{
			leadingBlank: 1,
			duration: 4,
			text: "Keep in mind that high cohesion and loose coupling are essential for good design.",
			actions: [
					{ actor: "conclusion", actionType: "appear", duration: 1 },
			],
	},
	{
			leadingBlank: 1,
			duration: 4,
			text: "In conclusion, avoid boolean parameters and use meaningful names.",
			actions: [
					{ actor: "final-thoughts", actionType: "appear", duration: 1 },
			],
	},
];


export const StoryBooleanParameters: React.FC = () => {
  return (
		<Story id="StoryBooleanParameters" width={720} height={720} subtitles={subtitles}  >
		<Audio src={staticFile("assets/audios/output.mp3")} />
    <AbsoluteFill style={{ backgroundColor: '#00abf0'}}>
      <AnimationEffect actor="blue background">
        <AbsoluteFill style={{ backgroundColor: '#e1f6ff'}}/>
			</AnimationEffect>
			<AbsoluteFill style={{ left: '10%', top: '2%', width: '70%', height: '100%'}}>
				<AnimationEffect actor="problem domain">
						<AnimationEffect actor="success">
					<AbsoluteFill style={{ left: '75%', top: '45%', width: '10%', height: '10%'}}>
						<span style={{fontSize: "30px", fontWeight: "bolder", color: "#228800"}}>SUCCESS</span>
					</AbsoluteFill>
						</AnimationEffect>
					<ProblemDomain />
				</AnimationEffect>
			</AbsoluteFill>
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
    <AbsoluteFill style={{ left: '80%', top: '5%', width: '10%', height: '20%'}}>
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