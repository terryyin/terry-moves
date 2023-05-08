import './global.css';


import React, { CSSProperties } from 'react';

import { Action, Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import AnimationEffect from './video_components/AnimationEffect';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';
import { OddeLogo } from './parts/OddeLogo';
import { OddeLogoInner } from './parts/OddeLogoInner';
import { FlipCoin } from './video_components/AutonomousComponents/FlipCoin';
import { Story } from './video_components/Story';
import { Blaster } from './parts/Blaster';
import { GroupInitialState } from './video_components/GroupInitialState';
import { RocketPlume } from './parts/RocketPlume';
import { CodeHighlight } from './video_components/CodeHighlight';
import HealthBar from './video_components/HealthBar';
import { Markdown } from './video_components/Markdown';
import { Subtitles } from './video_components/Subtitles';
import { Anchor } from './video_components/Anchor';
import { fireActions } from './stories/booleans/common';
import { ThinkingEmoji } from './parts/ThinkingEmoji';
import { Explosion } from './parts/Explosion';
import { Helmet } from './parts/Helmet';

const popupActios: Action[] = [
				{ actor: "helmet position", actionType: "move", duration: 1, absolutePosition: [0, 0.8, 0] },
				{ actor: "helmet", actionType: "3d rotate", endingTimeAdjustment: 1, totalRotation: [20, 0, 0] },
				{ actor: "blaster assembly", actionType: "move", duration: 1, absolutePosition: [0, 0, 0], offset: 0.5 },
		];
const hideActions: Action[] = [
				{ actor: "helmet position", actionType: "move", duration: 0.5, absolutePosition: [0, -3.1, 0] },
				{ actor: "helmet", actionType: "3d rotate", endingTimeAdjustment: 0.5, totalRotation: [-60, 20, 0], offset: 0.3 },
				{ actor: "blaster assembly", actionType: "move", duration: 0.5, absolutePosition: [5, -10, -4] },
		];
export const booleanReturnsSutitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 3, text: "Welcome back to the Oh My Bad Boolean Series!", actions:[
			  { actor: "caller", actionType: "appear" },
			  { actor: "soldier", actionType: "disappear"},
			  { actor: "blaster assembly", actionType: "oscillate", delta: [0, 0.02, 0]},
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 0, value: 100},
				{ actor: "helmet position", actionType: "move", duration: 0, absolutePosition: [0, -3.1, 0] },
				{ actor: "helmet", actionType: "3d rotate", endingTimeAdjustment: 0, totalRotation: [-60, 20, 0] },
				{ actor: "blaster assembly", actionType: "move", duration: 0, absolutePosition: [10, -16, 0], offset: 0.5 },
			  { actor: "mask", actionType: "appear", startDuration: 0.2, persistUntilSubtitleId: "intro to blaster"},

		] },
		{ leadingBlank: 1, duration: 4, text: "Why Are My Boolean Return Values Sometimes Bad?", actions:[
		] },
		{ leadingBlank: 1, duration: 4, text: "And reveal my STYLE with my code", actions:[
				{ actor: "second title", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 1, text: "and reveal my STYLE with my code", startDuration: 1, endDuration: 1 },
		] },
		{ leadingBlank: 1, duration: 5, text: "Oops, sorry, not 'my STYLE'. Should be 'Intention'.", actions:[
				{ actor: "second title", actionType: "replace text", endingTimeAdjustment: 4, line: 1, match: "my STYLE", replacement: "intention", startDuration: 0, endDuration: 2 },
				{ actor: "title", actionType: "disappear", startDuration: 1, offset: 5 },
		] },
		{ id: "intro to blaster" ,leadingBlank: 1, duration: 3, text: "Remeber my Blaster?", actions:[
			  { actor: "blaster", actionType: "3d animation reverse", duration: 2, speed: 4, pauseAtEnd: true, freezeBeforeStart: true },
		] },
		{ leadingBlank: 1, duration: 4, text: "You can pop up,", actions:[
			...popupActios,
		] },
		{ leadingBlank: 1, duration: 4, text: "and fire,", actions:[
				...fireActions,
				{ actor: "caller-fire", actionType: "connect to",  startDuration: 1, target: "callee-fire", bentLevel: -100, endingTimeAdjustment: 5},
		] },
		{ leadingBlank: 1, duration: 4, text: "then hide.", actions:[
			  ...hideActions
		] },
		{ leadingBlank: 0, duration: 4, text: "to my surprise, the Blaster's fire function returned a boolean value. ", actions:[
				{ actor: "callee", actionType: "insert text", endingTimeAdjustment: 3, line: 2, column: 2, text: "Boolean ", startDuration: 1, endDuration: 1 },
			  { actor: "thinker", actionType: "rotate and rise", duration: 4, value: 3, offset: 4 },
		] },
		{ leadingBlank: 1, duration: 4, text: "What did it mean? Shot successful? It exploded? No ammo left?", actions:[
			  ...popupActios,
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 1, value: 50, offset: 2},
			  { actor: "blaster explosion", actionType: "3d animation start", duration: 1, speed: 1, offset: 2},

		] },
		{ leadingBlank: 1, duration: 4, text: "This forced actions on callers, like writing a log.", actions:[
				{ actor: "caller", actionType: "insert text", endingTimeAdjustment: 1, line: 4, column: 2, text: "if(", startDuration: 1, endDuration: 0 },
				{ actor: "caller", actionType: "replace text", endingTimeAdjustment: 3, line: 4, match: ";", replacement: "){\n    log(\"Somebody should look at this.\");\n  }", startDuration: 1, endDuration: 1, offset: 2 },
		] },
		{ leadingBlank: 1, duration: 4, text: "It makes the caller code also lose its focus.", actions:[
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 1, value: 10, offset: 1},
		] },
		{ leadingBlank: 2, duration: 7, text: "Potential problems with a boolean return value: the meaning might not be clear and it force the caller to do something and disrupt the main logic flow", actions:[
			  { actor: "thinker", actionType: "disappear", startDuration: 1 },
			  { actor: "mask", actionType: "appear", startDuration: 0.2, persistUntilSubtitleId: "solution1"},
				{ actor: "learning from not return", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "solution1" },
			  ...hideActions,
		] },
		{ id: "solution1", leadingBlank: 1, duration: 4, text: "You don't have to return anything if there's no meaningful thing to return.", actions:[
			{ actor: "callee", actionType: "replace text", endingTimeAdjustment: 3, line: 2, match: "Boolean", replacement: "void", startDuration: 1, endDuration: 1 },
		] },
		{ id: "solution1", leadingBlank: 1, duration: 5, text: "When failing to fire is a surprise, the function should throw an exception.", actions:[
				{ actor: "callee", actionType: "insert text", endingTimeAdjustment: 4, line: 3, column: 20, text: "\n    throw new Error('...');", startDuration: 1, endDuration: 1, offset: 2 },
		] },
		{ leadingBlank: 1, duration: 4, text: "So that caller can choose where to handle the exceptional sitution", actions:[
		] },
		{ leadingBlank: 1, duration: 4, text: "Some programming languages, like Go, choose to handle exceptional cases more explicitly.", actions:[
		] },
		{ leadingBlank: 1, duration: 4, text: "But the idea is the same - separate expceional situation and the main logic.", actions:[
		] },
		{ leadingBlank: 1, duration: 4, text: "Avoiding forced actions on callers improves code readability. For checking ammo, add a separate hasAmmo function.", actions:[
		] },
		{ leadingBlank: 1, duration: 4, text: "This follows the Command-Query Separation principle, leading to cleaner, more maintainable code.", actions:[
		] },

		{ leadingBlank: 1, duration: 4, text: "Now, let's look at another example.", actions:[
			{ actor: "caller", actionType: "disappear" },
			{ actor: "soldier", actionType: "appear"},
			{ actor: "callee", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 3, count: 2},
		] },

		{ leadingBlank: 1, duration: 5, text: "The Blaster has a isSafetyOn function, and you can set the safety on or off as well.", actions:[
			{ actor: "callee", actionType: "move", duration: 1, absolutePosition: [-240, 80, 0] },
			{ actor: "callee", actionType: "insert text", endingTimeAdjustment: 4, line: 4, column: 0, text: "  Boolean isSafetyOn() {...}\n  void setSafetyOff(fingerprint) {...}", startDuration: 1, endDuration: 0 },
		] },

		{ leadingBlank: 1, duration: 4, text: "The soldier need to check if the safety is on. And if so, switch it off.", actions:[
			{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, -6, -1] },
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [6, -8, 0] },
			{ actor: "soldier", actionType: "insert text", endingTimeAdjustment: 4, line: 2, column: 30, text: "\n  if(this.blaster.isSafetyOn()) {\n    this.blaster.setSefetyOff(this.fingerprint);\n  }", startDuration: 1, endDuration: 0, offset: 1 },
		] },

		{ leadingBlank: 1, duration: 5, text: "As you might have seen, the Soldier class LIKES the feature of their Blaster a lot.", actions:[
				{ actor: "soldier", actionType: "highlight token", endingTimeAdjustment: 4, token: 'blaster', offset: 1},
		] },

		{ leadingBlank: 1, duration: 3, text: "This is called a Feature Envy.", actions:[
			{ actor: "camera", actionType: "camera look at", duration: 1, absolutePosition: [0, 0, 0] },
			{ actor: "camera", actionType: "move", duration: 1, absolutePosition: [0, 0, 0] },
		] },

		{ leadingBlank: 1, duration: 11, text: "We could etract part of it to a method of the Solider class first.", actions:[
				{ actor: "soldier", actionType: "highlight lines", endingTimeAdjustment: 4, lines: [3, 4, 5]},
			  { actor: "soldier", actionType: "insert text", endingTimeAdjustment: 3, line: 9, column: 30, text: "\nvoid ensureSafetyOff(fingerprint) {\n  if(this.blaster.isSafetyOn()) {\n    this.blaster.setSefetyOff(fingerprint);\n  }\n}", startDuration: 1, endDuration: 0, offset: 1 },
			  { actor: "soldier", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 3, count: 3, offset: 8},
			  { actor: "soldier", actionType: "insert text", endingTimeAdjustment: 1, line: 3, column: 0, text: "  this.endsureSafetyOff(this.fingerprint);\n", offset: 9},
		] },

		{ leadingBlank: 1, duration: 5, text: "Then move the new method to the Blaster class to stop the Feature Envy.", actions:[
				{ actor: "soldier", actionType: "highlight lines", endingTimeAdjustment: 4, lines: [8, 9, 10,11,12]},
			  { actor: "callee", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 30, text: "\n  void ensureSafetyOff(fingerprint) {\n    if(this.isSafetyOn()) {\n      this.setSefetyOff(fingerprint);\n    }\n  }", startDuration: 1, endDuration: 0, offset: 1 },
		] },

		{ leadingBlank: 1, duration: 5, text: "Before we finish the move, you might have noticed that the method just becomes slimmer.", actions:[
				{ actor: "soldier-left", actionType: "connect to",  startDuration: 1, target: "callee-left", bentLevel: 0, endingTimeAdjustment: 5, offset: 2},
				{ actor: "soldier-right", actionType: "connect to",  startDuration: 1, target: "callee-right", bentLevel: 0, endingTimeAdjustment: 5, offset: 2},
		] },

		{ leadingBlank: 1, duration: 5, text: "This is because now the operation of the data is closer to the source of the data.", actions:[
			  { actor: "soldier", actionType: "insert text", endingTimeAdjustment: 1, line: 3, column: 6, text: ".blaster", offset: 1},
			  { actor: "soldier", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 8, count: 5, offset: 3},
		] },

		{ leadingBlank: 1, duration: 5, text: "This Feature Envy problem is not unique to boolean return values.", actions:[
		] },

		{ leadingBlank: 1, duration: 5, text: "But I feel a boolean return value is more likely to leak internal state, leading to lower cohesion.", actions:[
		] },

		{ leadingBlank: 1, duration: 10, text: "In conclusion, boolean return values are not inherently bad, but be cautious with ambiguous boolean return values. Use meaningful return values, follow Tell, Don't Ask, and adhere to Command-Query Separation.", actions:[
			  { actor: "mask", actionType: "appear", startDuration: 0.2, endingTimeAdjustment: 100},
				{ actor: "conclusion", actionType: "appear", startDuration: 1 },
		] },
];

const codeString = `class Blaster {
  fire() {
    // ...
  }

}`;

const caller = `// class Soldier
popUpAttack() {
  this.popUp();
  this.blaster.fire();
  this.hide();
}
	`;

const learningFromException = `## This boolean return value:

* The meaning is unclear.
* Also makes the caller lose focus.`;

const conclusion = `## Conclusion

* Boolean return values are not inherently bad.
* Be cautious with ambiguous boolean return values.
* Look for Feature Envy. Avoid leaking internal state.
* Good principles:
	* Command-Query Separation (CQS)
	* Tell, Don't Ask
`;

const announceBoardStyle: CSSProperties = { 
				paddingTop: '20px',
				paddingLeft: '10px',
	fontFamily: 'Roboto, sans-serif', left: '0%', top: '35%', width: '100%', height: '45%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }

export const StoryBooleanReturns: React.FC = () => {
  return (
		<Story id="StoryBooleanReturns" width={720} height={720} subtitles={booleanReturnsSutitles}  >

    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Roboto, sans-serif', }}>

      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%', zIndex:2000}}>
          <ThreeDFrame cameraDistance={8} lookAtY={0} cameraY={0}>
						<directionalLight castShadow position={[10, 20, 15]} intensity={15} color={0xffffff} />	
						<GroupInitialState rotation={[0, Math.PI * 3 / 2, 0]} position={[-0, 0, 0]} scale={0.15}>
							<Explosion actor="blaster explosion" />
						</GroupInitialState>
						<GroupInitialState rotation={[0.7, Math.PI * 1.3, 0]} position={[1, 2.5, 0]} scale={1}>
							<ThreeAnimationEffect actor="blaster assembly" >
									<Blaster actor="blaster"/>
									<GroupInitialState rotation={[0, 0, Math.PI * 3 / 2]} position={[0, 0, 0]} scale={1}>
										<RocketPlume actor="blaster fire" position={[-0.6, -3, 0.3]} scale={1.8}/>
									</GroupInitialState>
							</ThreeAnimationEffect>
						</GroupInitialState>
						<ThreeAnimationEffect actor="helmet position">
							<GroupInitialState rotation={[0, 0, 0]} position={[-1, 1, 4]} scale={0.03}>
								<ThreeAnimationEffect actor="helmet">
									<Helmet />
								</ThreeAnimationEffect>
							</GroupInitialState>
						</ThreeAnimationEffect>
          </ThreeDFrame>
				</AbsoluteFill>
			</AnimationEffect>

			<CodeHighlight actor="caller" codeString={caller} style={{ left: '5%', top: '15%', width: '60%', height: '20%', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}}>
				<Anchor actor="caller-fire" style={{left: "245px", top: "80px"}}/>
			</CodeHighlight>
			<CodeHighlight actor="soldier" codeString={caller} style={{ left: '20%', top: '10%', width: '80%', height: '20%', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}}>
				<Anchor actor="soldier-left" style={{left: "26px", top: "220px"}}/>
				<Anchor actor="soldier-right" style={{left: "515px", top: "220px"}}/>
			</CodeHighlight>
			<CodeHighlight actor="callee" codeString={codeString} style={{ left: '35%', top: '45%', width: '50%', height: '50%', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}}>
				<Anchor actor="callee-fire" style={{left: "150px", top: "25px"}}/>
				<Anchor actor="callee-left" style={{left: "50px", top: "75px"}}/>
				<Anchor actor="callee-right" style={{left: "430px", top: "75px"}}/>
			</CodeHighlight>

      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ThreeDFrame cameraDistance={8} lookAtY={0} cameraY={0}>
						<directionalLight castShadow position={[10, 20, 15]} intensity={15} color={0xffffff} />	
						<ThreeAnimationEffect actor="thinker">
							<GroupInitialState rotation={[0, -0.5, 0]} position={[2.5, -2.5, 0]} scale={1}>
							<ThinkingEmoji/>
							</GroupInitialState>
						</ThreeAnimationEffect>
          </ThreeDFrame>
				</AbsoluteFill>
			</AnimationEffect>

    <AnimationEffect actor="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}/>
    <Markdown actor="learning from not return" style={announceBoardStyle}
			md={learningFromException}
		 />

    <Markdown actor="conclusion" style={{...announceBoardStyle, top: "15%", height: "60%", paddingTop: "20p"}}
			md={conclusion}
		 />



    <AnimationEffect actor="subtitles">
			<Subtitles scale={1} language="zhCN"/>
		</AnimationEffect>
    </AbsoluteFill>
    <AnimationEffect actor="title" style={announceBoardStyle} >
			<span style={{
				display: 'block',
				paddingTop: '30px',
      fontSize: '36px',
			color: 'white',
      fontWeight: 'bold',
			fontFamily: 'Roboto, sans-serif',
    }}>Why Are My Boolean Return Values Sometimes Bad?</span>

			<CodeHighlight actor="second title" style={{
				position: 'relative',
				paddingTop: '35px',
				display: 'block',
      fontSize: '30px',
			color: 'white',
			fontFamily: 'IBM Plex Mono',
    }} language="html" codeString=""/>

    <AbsoluteFill style={{ top: '85%', left: "82%", height: '10%'}}>
			<span style={{fontFamily: 'Roboto, sans-serif',fontSize: '20px', color: "white"}}>terry@Odd-e</span>
		</AbsoluteFill>

		</AnimationEffect>
    <AbsoluteFill style={{ left: '0%',  top: '0.5%', width: '10%', height: '10%'}}>
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#408fdd", textAlign: 'center'}}>Clear<br/>Intention</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '90%',  top: '0.5%', width: '10%', height: '10%'}}>
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#ff8e00", textAlign: 'center'}}>high<br/>Cohesion</span>
		</AbsoluteFill>
		<HealthBar leftSide actor="clear intention health bar" style={{ left: '10%', top: '2.4%', width: '40%', height: '3%'}}/>
    <AbsoluteFill style={{ left: '50%', top: '2.4%', width: '40%', height: '3%'}}>
		<HealthBar actor="high cohesion health bar" />
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