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
import { CalloutCloud } from './video_components/CalloutCloud';
import HealthBar from './video_components/HealthBar';

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
					{ actor: "second title", actionType: "type", duration: 3, text: "Seeking High Cohesion, Loose Coupling Design" },
			  { actor: "blaster assembly", actionType: "oscillate", duration: 1000,  delta: [0, 0.02, 0]},
			],
	},
	{
			leadingBlank: 1,
			duration: 4.5,
			text: "In my game program, there's a powerful tool called a Blaster.",
			actions: [
					{ actor: "title", actionType: "disappear", duration: 1 },
					{ actor: "subtitles", actionType: "appear", duration: 1 },
					{ actor: "callee", actionType: "appear", duration: 1 },
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "You can fire the Blaster whenever you want.",
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
			text: "But if you load it first, ",
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
			text: "The function action() is called from many places in the code.",
			actions: [
				{ actor: "caller 3", actionType: "appear", duration: 0.2},
				{ actor: "caller 1", actionType: "highlight token", duration: 3, token: 'action'},
				{ actor: "caller 2", actionType: "highlight token", duration: 3, token: 'action'},
				{ actor: "caller 3", actionType: "highlight token", duration: 3, token: 'action'},
				{ actor: "callee", actionType: "highlight token", duration: 3, token: 'action'},
			],
	},

	{
			leadingBlank: 1,
			duration: 7,
			text: "Using a boolean parameter reduces the number of API calls users have to remember.",
			actions: [
				{ actor: "caller 1", actionType: "highlight token", duration: 7, token: 'true'},
				{ actor: "caller 2", actionType: "highlight token", duration: 7, token: 'false'},
				{ actor: "caller 3", actionType: "highlight token", duration: 7, token: 'true'},
				{ actor: "callee", actionType: "highlight token", duration: 7, token: 'isLoad'},
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "So, what's the problem with using a boolean parameter?",
			actions: [
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "As we can see, every caller knows exactly what they want.",
			actions: [
				{ actor: "caller 1", actionType: "highlight token", duration: 7, token: 'true'},
				{ actor: "caller 2", actionType: "highlight token", duration: 7, token: 'false'},
				{ actor: "caller 3", actionType: "highlight token", duration: 7, token: 'true'},
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "It means the condition 'isLoad' in the 'action' function is redundant.",
			actions: [
				{ actor: "callee", actionType: "highlight lines", duration: 5, lines: [3, 5]},
			],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "I've been inventing countering logics in the callee and callers to keep myself busy.",
			actions: [
			],
	},

	{
			leadingBlank: 1,
			duration: 8,
			text: "Say, now Caller 1 is propsing an interface change.",
			actions: [
				{ actor: 'caller 1 callout1', actionType: 'appear', duration: 0.5},
				{ actor: "caller 1", actionType: "replace text", duration: 1, line: 2, match: 'true', replacement: '1000'},
				{ actor: "caller 1", actionType: "highlight token", duration: 6.9, token: '1000', style: 'wavy underline'},
			],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "So we changed the API to take a parameter 'loadAmount'.",
			actions: [
				{ actor: 'callee callout1', actionType: 'appear', duration: 0.5},
				{ actor: "callee", actionType: "replace text", duration: 1, line: 2, match: 'isLoad', replacement: 'loadAmount'},
				{ actor: "caller 2", actionType: "highlight token", duration: 20, token: 'false', style: 'wavy underline', offset: 1},
				{ actor: "caller 3", actionType: "highlight token", duration: 20, token: 'true', style: 'wavy underline', offset: 1},
				{ actor: "callee", actionType: "replace text", duration: 1.5, line: 3, match: 'isLoad', replacement: 'loadAmount > 0', offset: 1.2},
				{ actor: "callee", actionType: "insert text", duration: 1, line: 4, column: 16, text: 'loadAmount', offset: 2.9},
				{ actor: "callee", actionType: "insert text", duration: 1, line: 13, column: 15, text: 'loadAmount', offset: 4.1},
			],
	},

	{
		leadingBlank: 1,
		duration: 6,
		text: "Caller 3 is happy with the new API.",
		actions: [
			{ actor: 'caller 1 callout1', actionType: 'disappear', duration: 1.5},
			{ actor: 'caller 3 callout1', actionType: 'appear', duration: 0.5},
			{ actor: "caller 3", actionType: "replace text", duration: 1, line: 2, match: 'true', replacement: '9999999'},
		],
	},

	{
		leadingBlank: 1,
		duration: 6,
		text: "But Caller 2 is confused about why they are involved in this change.",
		actions: [
			{ actor: 'callee callout1', actionType: 'disappear', duration: 1.5},
			{ actor: 'caller 2 callout1', actionType: 'appear', duration: 0.5},
		],
	},

	{
		leadingBlank: 1,
		duration: 6,
		text: "The boolean parameter makes the callers and callee tightly coupled.",
		actions: [
			{ actor: 'caller 2 callout1', actionType: 'disappear', duration: 0.5},
			{ actor: 'caller 3 callout1', actionType: 'disappear', duration: 0.5},
		],
	},

	{
		leadingBlank: 1,
		duration: 6,
		text: [
			"This tight coupling:",
			"* introduces unnecessary complexity.",
			"* makes changes harder.",
			"* complicates collaboration.",
		],
		scale: 1.3,
		position: 'center',
		
		actions: [
		],
	},

	{
			leadingBlank: 0,
			duration: 5,
			text: "Just let callers call the methods they want.",
			actions: [],
	},

	{
			leadingBlank: 0,
			duration: 5,
			text: "This reduces complexity and dependencies, resulting in lower coupling.",
			actions: [],
	},


	{
			leadingBlank: 1,
			duration: 7,
			text: "However, there's a pitfall that might bring more significant problems than maintaining tight coupling.",
			actions: [
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "After load, the Blaster must be fired. Otherwise, it will explode.",
			actions: [
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "Well, no worries. Our current code is doing exactly that.",
			actions: [
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "High cohesion means the things that belong together are together.",
			actions: [
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "Future changes will be error-prone due to the lack of cohesion.",
			actions: [
			],
	},

	{
			leadingBlank: 0,
			duration: 5,
			text: "Make the code cohesive.",
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
			text: "In conclusion, avoid boolean parameters, use meaningful names, and aim for high cohesion and loose coupling in design.",
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

		<CalloutCloud actor='caller 1 callout1' style={{top: '10%', left: "2%"}} tailShift={-70} tailHeightPx={100}>
			<span style={{ fontSize: '30px', margin: 0 }} > 🤔 Can we pass the load amount to action()? 💡  </span>
		</CalloutCloud>
		<CalloutCloud actor='callee callout1' style={{top: '21%', left: "20%"}} tailShift={20}>
			<span style={{ fontSize: '30px', margin: 0 }} > Absolutely! Let's update the interface. 🛠️  </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 3 callout1' style={{top: '66%', left: "5%"}} tailShift={-20}>
			<span style={{ fontSize: '30px', margin: 0 }} > Woohoo! 🎉 Just what I needed! </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 2 callout1' style={{top: '43%', left: "1%"}} tailShift={-40}>
			<span style={{ fontSize: '30px', margin: 0 , backgroundColor: "#ffaaaa"}} > 😠 What?! Why change it? What amount? 🚫  </span>
		</CalloutCloud>


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
    }} text="Seeking High Cohesion, Loose Coupling"/>

		</AnimationEffect>
    <AbsoluteFill style={{ left: '10%', top: '2.4%', width: '40%', height: '3%'}}>
		<HealthBar leftSide percentage={undefined}/>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '50%', top: '2.4%', width: '40%', height: '3%'}}>
		<HealthBar percentage={75} />
		</AbsoluteFill>
    <AbsoluteFill style={{ marginLeft: 'auto', marginRight: 'auto', top: '6%', width: '10%', height: '10%'}}>
			<span style={{fontSize: '24px'}}>terry@</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ marginLeft: 'auto', marginRight: 'auto', top: '-2%', width: '12%', height: '20%'}}>
			<OddeLogo />
			<FlipCoin speed={2} interval={4} shift={1} >
			  <OddeLogoInner />
			</FlipCoin>
		</AbsoluteFill>
		</Story>
  );
};