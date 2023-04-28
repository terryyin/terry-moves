import './global.css';


import React, { CSSProperties } from 'react';

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
import { LightSource } from './video_components/LightSource';
import { Markdown } from './video_components/Markdown';
import { Explosion } from './parts/Explosion';

const fireActions: Action[] =
[
			  { actor: "blaster fire", actionType: "3d animation start", duration: 2, speed: 2 },
			  { actor: "blaster assembly", actionType: "move", duration: 0.1, absolutePosition: [0.5, 0, 0]},
			  { actor: "blaster assembly", actionType: "move", duration: 0.4,  absolutePosition: [0, 0, 0], offset: 0.2},
];

const loadedFireActions: Action[] =
[
				...fireActions,
			  { actor: "blaster temperature", actionType: "additive value change to", duration: 2, value: 0 },
			  { actor: "blaster powerful fire", actionType: "3d animation start", duration: 3, speed: 2 },
];

const loadActions: Action[] =
[
			  { actor: "blaster", actionType: "3d animation start", duration: 1.2, speed: 3, pauseAtEnd: true, freezeBeforeStart: true },
			  { actor: "blaster temperature", actionType: "additive value change to", duration: 1.2, value: 50 },
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
			duration: 3,
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
				...loadedFireActions,
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
			duration: 5,
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
				{ actor: "loose coupling health bar", actionType: "additive value change to", duration: 0.1, value: 100},
				{ actor: "loose coupling health bar", actionType: "additive value change to", duration: 1, value: 50, offset: 0.5},
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
			{ actor: "loose coupling health bar", actionType: "additive value change to", duration: 1, value: 10},
			{ actor: 'caller 2 callout1', actionType: 'disappear', duration: 0.5},
			{ actor: 'caller 3 callout1', actionType: 'disappear', duration: 0.5},
		],
	},

	{
		leadingBlank: 1,
		duration: 11,
		text: "This tight coupling introduces unnecessary complexity, makes changes harder and complicates collaboration.",
		
		actions: [
			{ actor: "mask", actionType: "appear", duration: 0.2},
			{ actor: 'learning from tight coupling', actionType: 'appear', duration: 0.5},
			{ actor: "mask", actionType: "disappear", duration: 1, offset: 10},
			{ actor: 'learning from tight coupling', actionType: 'disappear', duration: 0.5, offset: 10},

		],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "Just let callers call the methods they want.",
			actions: [
			{ actor: "callee", actionType: "replace text", duration: 1, line: 13, match: " private", replacement: ""},
			{ actor: "caller 1", actionType: "replace text", duration: 1, line: 2, replacement: "  blaster.load(1000);\n  blaster.fire();", offset: 1},
			{ actor: "caller 2", actionType: "replace text", duration: 1, line: 2, replacement: "  blaster.fire();", offset: 2.5},
			{ actor: "caller 3", actionType: "replace text", duration: 1, line: 2, replacement: "  blaster.load(999999990);\n  blaster.fire();", offset: 4},
			{ actor: "callee", actionType: "highlight lines", duration: 0.5, lines: [2, 3, 4, 5, 6, 7], offset: 5.5},
			{ actor: "callee", actionType: "delete lines", duration: 1, fromLine: 2, count: 7, offset: 6},

			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "This reduces complexity and dependencies, resulting in lower coupling.",
			actions: [
				{ actor: "loose coupling health bar", actionType: "additive value change to", duration: 1, value: 90, offset: 0},
			],
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
			duration: 4,
			text: "After load, the Blaster must be fired.",
			actions: [
				...loadActions,
			  { actor: "caller 3", actionType: "highlight lines", duration: 5, lines: [2], offset: 0},
			],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "Otherwise, it will explode.",
			actions: [
			  { actor: "blaster temperature", actionType: "additive value change to", duration: 4, value: 1000, offset: 0},
			  { actor: "caller 3", actionType: "replace text", duration: 1, line: 3, replacement: "  this.survey();", offset: 0},
			  { actor: "caller 3", actionType: "highlight lines", duration: 3, lines: [3], offset: 2},
			  { actor: "blaster explosion", actionType: "3d animation start", duration: 1, speed: 1, offset: 4},
			  { actor: "blaster temperature", actionType: "additive value change to", duration: 2, value: 0, offset: 4},
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "Well, no worries. Our current code is doing exactly that.",
			actions: [
			  { actor: "caller 3", actionType: "replace text", duration: 1, line: 3, replacement: "  this.fire();", offset: 0},
			  { actor: "caller 1", actionType: "highlight lines", duration: 3, lines: [2, 3], offset: 1},
			  { actor: "caller 3", actionType: "highlight lines", duration: 3, lines: [2, 3], offset: 1},
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
			text: "My code doesn't seem to have that. And it makes the cohesion low.",
			actions: [
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 1, value: 100, offset: 0.1},
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 2, value: 50, offset: 0.2},
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "Say caller 1 found a bug caused by the now more powerful loaded fire.",
			actions: [
			],
	},

	{
			leadingBlank: 0,
			duration: 5,
			text: "After load, the blaster should be reaimed before fire,",
			actions: [
				...loadActions,
			  { actor: "caller 1", actionType: "insert text", duration: 2, line: 2, column: 20, text: "\n  blaster.reAim();", offset: 1},
			  { actor: "caller 1", actionType: "highlight token", duration: 4, token: "reAim", offset: 1},
			  { actor: "blaster assembly", actionType: "3d rotate", duration: 2, totalRotation: [-60, 45, 30], offset: 4},
			],
	},

	{
			leadingBlank: 0,
			duration: 5,
			text: "so not to hurt teammates.",
			actions: [
				...loadedFireActions,
			  { actor: "blaster assembly", actionType: "3d rotate", duration: 2, totalRotation: [0, 0, 0], offset: 4},
			],
	},

	{
			leadingBlank: 0,
			duration: 5,
			text: "Caller 1 fixed the bug.",
			actions: [
			  { actor: "caller 1 callout2", actionType: "appear", duration: 1, offset: 0},
			],
	},

	{
			leadingBlank: 0,
			duration: 6,
			text: "However, caller 3 is still buggy, but the code start to diverse.",
			actions: [
				...loadedFireActions,
			  { actor: "blaster more powerful fire", actionType: "3d animation start", duration: 3, speed: 2 },
			  { actor: "caller 3", actionType: "highlight lines", duration: 4, lines: [2, 3], offset: 1},
			  { actor: "caller 3 callout2", actionType: "appear", duration: 1, offset: 3},
			],
	},

	{
			leadingBlank: 0,
			duration: 4,
			text: "Again, it shows my code is not cohesive",
			actions: [
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 2, value: 10, offset: 0.2},
			],
	},

	{
			leadingBlank: 0,
			duration: 10,
			text: "Due to the lack of cohesion, my code lost important domain concepts and the future changes will become error-prone.",
			actions: [
				{ actor: "mask", actionType: "appear", duration: 0.2},
				{ actor: "learning from low cohesion", actionType: "appear", duration: 0.5, offset: 0.2},
				{ actor: "mask", actionType: "disappear", duration: 1, offset: 10},
				{ actor: "learning from low cohesion", actionType: "disappear", duration: 0.5, offset: 10},
			],
	},

	{
			leadingBlank: 0,
			duration: 8,
			text: "The bug would have been avoided if I kept my code more cohesive.",
			actions: [
			  { actor: "caller 3 callout2", actionType: "disappear", duration: 0.5, offset: 0},
			  { actor: "caller 1 callout2", actionType: "disappear", duration: 0.5, offset: 0},
			  { actor: "callee", actionType: "insert text", duration: 2, line: 4, column: 10, text: "\n\n  loadedFire(loadAmount) {\n    this.load(loadAmout);\n    this.fire();\n  };", offset: 1},
			  { actor: "callee", actionType: "insert text", duration: 0.5, line: 11, column: 2, text: "private ", offset: 3.5},
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 1, value: 30, offset: 3.5},
			  { actor: "caller 1", actionType: "delete lines", duration: 0.5, fromLine: 2, count: 3, offset: 4.5},
			  { actor: "caller 1", actionType: "insert text", duration: 0.5, line: 1, column: 13, text: "\n  blaster.loadedFire(1000);", offset: 5.1},
			  { actor: "caller 3", actionType: "delete lines", duration: 0.5, fromLine: 2, count: 3, offset: 4.5},
			  { actor: "caller 3", actionType: "insert text", duration: 0.5, line: 1, column: 13, text: "\n  blaster.loadedFire(999999);\n", offset: 5.1},
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 2, value: 70, offset: 5.5},
			  { actor: "callee", actionType: "insert text", duration: 1, line: 7, column: 25, text: "\n    this.reAim();", offset: 5.5},
			],
	},

	{
			leadingBlank: 1,
			duration: 12,
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

const learningCoupling = `## This tight coupling:

* introduces unnecessary complexity.
* makes changes harder.
* complicates collaboration.`;

const learningCohesion = `## This low cohesion:

* ignores immportant domain concepts.
* makes future changes error-prone.`;

const announceBoardStyle: CSSProperties = { 
				paddingTop: '20px',
				paddingLeft: '10px',
	fontFamily: 'Roboto, sans-serif', left: '0%', top: '40%', width: '100%', height: '40%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }

export const StoryBooleanParameters: React.FC = () => {
  return (
		<Story id="StoryBooleanParameters" width={720} height={720} subtitles={subtitles}  >
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Roboto, sans-serif', }}>
      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ThreeDFrame cameraDistance={8} lookAtY={0} cameraY={0}>
						<directionalLight
							castShadow
							position={[10, 20, 15]}
							intensity={15}
							color={0xffffff}
						/>	
						<LightSource actor="blaster temperature" position={[0, 0, 15]} color="#ff0000" />
						<GroupInitialState rotation={[0, Math.PI * 3 / 2, 0]} position={[-5, 0, 0]} scale={0.15}>
							<Explosion actor="blaster explosion" />
						</GroupInitialState>
						<GroupInitialState rotation={[0, Math.PI, 0]} position={[-3, 3.5, 0]} scale={1}>
            <ThreeAnimationEffect actor="blaster assembly" >
								<Blaster actor="blaster"/>
								<GroupInitialState rotation={[0, 0, Math.PI * 3 / 2]} position={[0, 0, 0]} scale={1}>
									<RocketPlume actor="blaster fire" position={[-0.6, -3, 0.3]} scale={1.8}/>
									<RocketPlume actor="blaster powerful fire" position={[-0.6, -3, 0.3]} scale={4}/>
									<RocketPlume actor="blaster more powerful fire" position={[-0.6, -3, 0.3]} scale={8}/>
								</GroupInitialState>
            </ThreeAnimationEffect>
						</GroupInitialState>
          </ThreeDFrame>
      </AbsoluteFill>
			</AnimationEffect>
		<CodeHighlight actor="caller 1" codeString={caller1} style={{ left: '5%', top: '32%', width: '40%', height: '20%', }}/>
		<CodeHighlight actor="caller 2" codeString={caller2} style={{ left: '5%', top: '52%', width: '40%', height: '20%', }}/>
		<CodeHighlight actor="caller 3" codeString={caller3} style={{ left: '5%', top: '74%', width: '40%', height: '20%', }}/>
		<CodeHighlight actor="callee" codeString={codeString} style={{ left: '55%', top: '30%', width: '40%', height: '50%', }}/>

		<CalloutCloud actor='caller 1 callout1' style={{top: '10%', left: "2%"}} tailShift={-70} tailHeightPx={100}>
			<span style={{ fontSize: '30px', margin: 0 }} > 🤔 Can we pass the load amount to action()? 💡  </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 1 callout2' style={{top: '25%', left: "10%"}} tailShift={-70} tailHeightPx={20}>
			<span style={{ fontSize: '30px', margin: 0 }} > 🎉🎉🎉 Yeah! Ticket closed! 🎉🎉🎉 </span>
		</CalloutCloud>
		<CalloutCloud actor='callee callout1' style={{top: '21%', left: "20%"}} tailShift={20}>
			<span style={{ fontSize: '30px', margin: 0 }} > Absolutely! Let's update the interface. 🛠️  </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 3 callout1' style={{top: '63%', left: "5%"}} tailShift={-20}>
			<span style={{ fontSize: '30px', margin: 0 }} > Woohoo! 🎉 Just what I needed! </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 3 callout2' style={{top: '63%', left: "30%"}} tailShift={-20}>
			<span style={{ fontSize: '30px', margin: 0, backgroundColor: "#ffaaaa"}} >Oops. SORRY!!!!!!!! </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 2 callout1' style={{top: '41%', left: "4%"}} tailShift={-40}>
			<span style={{ fontSize: '30px', margin: 0 , backgroundColor: "#ffaaaa"}} > 😠 What?! Why change it? What amount? 🚫  </span>
		</CalloutCloud>

    <AnimationEffect actor="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}/>

    <Markdown actor="learning from tight coupling" style={announceBoardStyle}
			md={learningCoupling}
		 />
    <Markdown actor="learning from low cohesion" style={announceBoardStyle}
			md={learningCohesion}
		 />


    <AnimationEffect actor="subtitles">
			<Subtitles scale={1} />
		</AnimationEffect>
    </AbsoluteFill>
    <AnimationEffect actor="title" style={announceBoardStyle} >
			<span style={{
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
    }} text="Seeking High Cohesion, Loose Coupling design"/>

		</AnimationEffect>
    <AbsoluteFill style={{ left: '0%',  top: '0.5%', width: '10%', height: '10%'}}>
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#408fdd", textAlign: 'center'}}>Loose<br/>Coupling</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '90%',  top: '0.5%', width: '10%', height: '10%'}}>
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#ff8e00", textAlign: 'center'}}>high<br/>Cohesion</span>
		</AbsoluteFill>
		<HealthBar leftSide actor="loose coupling health bar" style={{ left: '10%', top: '2.4%', width: '40%', height: '3%'}}/>
    <AbsoluteFill style={{ left: '50%', top: '2.4%', width: '40%', height: '3%'}}>
		<HealthBar actor="high cohesion health bar" />
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