import './global.css';


import React from 'react';

import { Action, Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { Subtitles } from './video_components/Subtitles';
import AnimationEffect from './video_components/AnimationEffect';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';
import { OddeLogo } from './parts/OddeLogo';
import { OddeLogoInner } from './parts/OddeLogoInner';
import { FlipCoin } from './video_components/AutonomousComponents/FlipCoin';
import { Story } from './video_components/Story';
import { TypingText } from './video_components/TypingText';
import { Blaster } from './parts/Blaster';
import { GroupInitialState } from './video_components/GroupInitialState';
import { RocketPlume } from './parts/RocketPlume';
import { CodeHighlight } from './video_components/CodeHighlight';

const fireActions: Action[] =
[
			  { actor: "blaster fire", actionType: "3d animation start", duration: 2, speed: 2 },
			  { actor: "blaster assembly", actionType: "move", duration: 0.1, absolutePosition: [0.5, 0, 0]},
			  { actor: "blaster assembly", actionType: "move", duration: 0.4,  absolutePosition: [0, 0, 0], offset: 0.2},
];

const loadActions: Action[] =
[
			  { actor: "blaster", actionType: "3d animation start", duration: 1.2, speed: 3, pauseAtEnd: true, freezeBeforeStart: true },
			  { actor: "blaster assembly", actionType: "3d rotate", duration: 0.4,  totalRotation: [0, 0, -30]},
			  { actor: "blaster assembly", actionType: "3d rotate", duration: 0.8,  totalRotation: [0, 0, 0], offset: 0.4},
];

const subtitles: Subtitle[] = [
	{
			leadingBlank: 1,
			duration: 5,
			text: "",
			actions: [
					{ actor: "second title", actionType: "type", duration: 3, text: "Seeking for High Cohesion, Loose Coupling Design" },
			  { actor: "blaster assembly", actionType: "oscillate", duration: 1000,  delta: [0, 0.02, 0]},
			],
	},
	{
			leadingBlank: 1,
			duration: 4,
			text: "In my game program, a Blaster is a powerful tool.",
			actions: [
					{ actor: "title", actionType: "disappear", duration: 1 },
					{ actor: "subtitles", actionType: "appear", duration: 1 },
					{ actor: "callee", actionType: "appear", duration: 1 },
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "You can fire it whenever you want.",
			actions: [
				...fireActions,
				{ actor: "caller 2", actionType: "appear", duration: 0.2},
				{ actor: "caller 2", actionType: "highlight lines", duration: 3, lines: [2]},
				{ actor: "callee", actionType: "highlight lines", duration: 3, lines: [6, 10]},
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "But if you load it first,",
			actions: [
				...loadActions,
				{ actor: "caller 1", actionType: "appear", duration: 0.2},
				{ actor: "caller 1", actionType: "highlight token", duration: 3, token: 'true'},
				{ actor: "callee", actionType: "highlight token", duration: 3, token: 'isLoad'},
				{ actor: "callee", actionType: "highlight lines", duration: 3, lines: [4, 14]},
			],
	},

	{
			leadingBlank: 0,
			duration: 4,
			text: "you can fire more powerful shots.",
			actions: [
				...fireActions,
			  { actor: "blaster powerful fire", actionType: "3d animation start", duration: 3, speed: 2 },
				{ actor: "caller 1", actionType: "appear", duration: 0.2},
				{ actor: "caller 1", actionType: "highlight lines", duration: 3, lines: [2]},
				{ actor: "callee", actionType: "highlight lines", duration: 3, lines: [4, 6, 10, 14]},
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "The function 'action' is call from many places.",
			actions: [
				...fireActions,
				{ actor: "caller 3", actionType: "appear", duration: 0.2},
				{ actor: "caller 1", actionType: "highlight token", duration: 3, token: 'action'},
				{ actor: "caller 2", actionType: "highlight token", duration: 3, token: 'action'},
				{ actor: "caller 3", actionType: "highlight token", duration: 3, token: 'action'},
				{ actor: "callee", actionType: "highlight token", duration: 3, token: 'action'},
			],
	},

	{
			leadingBlank: 0,
			duration: 4,
			text: "gun.action(true); and gun.action(false);",
			actions: [],
	},
	{
			leadingBlank: 1,
			duration: 4,
			text: "The implementation might look like this:",
			actions: [
				...fireActions
			],
	},
	{
			leadingBlank: 0,
			duration: 4,
			text: "class Gun { action(isLoad) { this.fire(); if(isLoad) this.load(); }}",
			actions: [
			  { actor: "blaster assembly", actionType: "3d rotate", duration: 0.2, totalRotation: [-60, 45, 30]},
			  { actor: "blaster fire", actionType: "3d animation start", duration: 1, speed: 2, offset: 1 },
			  { actor: "blaster assembly", actionType: "move", duration: 0.2, absolutePosition: [0.5, 0, 0], offset: 1},
			  { actor: "blaster assembly", actionType: "move", duration: 0.4,  absolutePosition: [0, 0, 0], offset: 1.4},
					// { actor: "example2", actionType: "highlight", duration: 2 },
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
					// { actor: "refactor", actionType: "highlight", duration: 2 },
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

const codeString = `class Blaster {
  action(isLoad) {
    if(isLoad) {
      this.load();
    }
    this.fire();
  }

  fire() {
    // ...
  }

  private load() {
    // ...
  }
}`;

const caller1 = `  // Caller 1
  blaster.action(true);
	`;

const caller2 = `  // Caller 2
  blaster.action(false);
	`;

const caller3 = `  // Caller 3
  blaster.action(true);
	`;

export const StoryBooleanParameters: React.FC = () => {
  return (
		<Story id="StoryBooleanParameters" width={720} height={720} subtitles={subtitles}  >
    <AbsoluteFill style={{ backgroundColor: '#220011', fontFamily: 'Roboto, sans-serif', }}>
      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ThreeDFrame >
						<directionalLight
							castShadow
							position={[10, 20, 15]}
							intensity={15}
							color={0xffffff}
						/>	
						<GroupInitialState rotation={[0, Math.PI, 0]} position={[-3, 4, 0]} scale={1}>
            <ThreeAnimationEffect actor="blaster assembly" cameraDistance={8} lookAtY={0} cameraY={0}>
								<Blaster actor="blaster"/>
								<GroupInitialState rotation={[0, 0, Math.PI * 3 / 2]} position={[0, 0, 0]} scale={1}>
								<RocketPlume actor="blaster fire" position={[-0.6, -3, 0.3]} scale={1.8}/>
								<RocketPlume actor="blaster powerful fire" position={[-0.6, -3, 0.3]} scale={4}/>
								</GroupInitialState>
            </ThreeAnimationEffect>
						</GroupInitialState>
          </ThreeDFrame>
      </AbsoluteFill>
			</AnimationEffect>
		<CodeHighlight actor="caller 1" codeString={caller1} style={{ left: '5%', top: '30%', width: '40%', height: '20%', backgroundColor: "black"}}/>
		<CodeHighlight actor="caller 2" codeString={caller2} style={{ left: '5%', top: '52%', width: '40%', height: '20%', backgroundColor: "black"}}/>
		<CodeHighlight actor="caller 3" codeString={caller3} style={{ left: '5%', top: '74%', width: '40%', height: '20%', backgroundColor: "black"}}/>
		<CodeHighlight actor="callee" codeString={codeString} style={{ left: '55%', top: '30%', width: '40%', height: '50%', backgroundColor: "black"}}/>
    <AnimationEffect actor="subtitles" >
			<Subtitles scale={1.2} />
			</AnimationEffect>
    </AbsoluteFill>
    <AnimationEffect actor="title" style={{ fontFamily: 'Roboto, sans-serif', left: '0%', top: '40%', width: '100%', height: '40%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }} >
			<span style={{
				paddingTop: '20px',
				paddingLeft: '10px',
				display: 'block',
      fontSize: '36px',
			color: 'white',
      fontWeight: 'bold',
			fontFamily: 'Roboto, sans-serif',
    }}>Why Is My Boolean Parameter Bad?</span>

			<TypingText actor="second title" style={{
				position: 'relative',
				paddingTop: '40px',
				paddingLeft: '10px',
				display: 'block',
      fontSize: '30px',
			color: 'white',
			fontFamily: 'IBM Plex Mono',
    }} text="And High Cohesion, Loose Coupling"/>

		</AnimationEffect>
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