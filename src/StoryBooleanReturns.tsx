import './global.css';


import React, { CSSProperties } from 'react';

import { Subtitle } from './models/Subtitles';
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
import { LightSource } from './video_components/LightSource';
import { Markdown } from './video_components/Markdown';
import { Subtitles } from './video_components/Subtitles';
import { Anchor } from './video_components/Anchor';
import { fireActions } from './stories/booleans/common';
import { ThinkingEmoji } from './parts/ThinkingEmoji';
import { Explosion } from './parts/Explosion';

export const booleanReturnsSutitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 3, text: "Welcome back to the Oh My Bad Boolean Series!", actions:[
			  { actor: "blaster assembly", actionType: "oscillate", delta: [0, 0.02, 0]},
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 0, value: 100},

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
		{ leadingBlank: 1, duration: 3, text: "Remeber my Blaster?", actions:[
			  { actor: "blaster", actionType: "3d animation reverse", duration: 2, speed: 4, pauseAtEnd: true, freezeBeforeStart: true },
		] },
		{ leadingBlank: 1, duration: 4, text: "You could fire it anytime.", actions:[
				...fireActions,
				{ actor: "caller-fire", actionType: "connect to",  startDuration: 1, target: "callee-fire", bentLevel: -100},
		] },
		{ leadingBlank: 0, duration: 4, text: "to my surprise, the Blaster's fire function returned a boolean value. ", actions:[
				{ actor: "callee", actionType: "insert text", endingTimeAdjustment: 3, line: 2, column: 2, text: "Boolean ", startDuration: 1, endDuration: 1 },
			  { actor: "thinker", actionType: "rotate and rise", duration: 4, value: 3, offset: 4 },
		] },
		{ leadingBlank: 1, duration: 4, text: "What did it mean? Shot successful? It exploded? No ammo left?", actions:[
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
		{ leadingBlank: 2, duration: 4, text: "Potential problems with a boolean problem: the meaning might not be clear and it force the caller to do something and disrupt the main logic flow", actions:[
				{ actor: "learning from not return", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "envy" },
		] },
		{ leadingBlank: 1, duration: 4, text: "Avoiding forced actions on callers improves code readability. For checking ammo, add a separate hasAmmo function.", actions:[
			  { actor: "thinker", actionType: "disappear", startDuration: 1 },
		] },
		{ leadingBlank: 1, duration: 4, text: "When failing to fire is a surprise, the function should throw an exception.", actions:[
		] },
		{ leadingBlank: 1, duration: 4, text: "This follows the Command-Query Separation principle, leading to cleaner, more maintainable code.", actions:[
		] },
		{ id: "envy", leadingBlank: 1, duration: 4, text: "Now, let's discuss functions returning an internal state, leading to losing domain concepts and violating Tell, Don't Ask.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "The Blaster has a getSafetyStatus function, making callers responsible for safety. This can lead to feature envy, code duplication, and loss of domain concepts.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "Instead, use ensureSafetyOn and ensureSafetyOff methods. This way, callers don't handle the internal state, preserving domain concepts and making the code more modular.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "Direct mapping from the problem domain to the solution domain is often preferred, but exceptions exist.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "In conclusion, be cautious with ambiguous boolean return values. Use meaningful return values, follow Tell, Don't Ask, and adhere to Command-Query Separation.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "This will lead to cleaner, more maintainable code and fewer headaches for you, the developer!", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "Remember, boolean return values aren't inherently evil, but can contribute to ambiguity and other issues.", actions:[] },
];

const codeString = `class Blaster {
  fire() {
    // ...
  }

}`;

const caller = `// Caller
popUpAttack() {
  this.popUp();
  this.blaster.fire();
  this.hide();
}
	`;

const learningFromException = `## This low cohesion:

* ignores immportant domain concepts.
* makes future changes error-prone.`;

const announceBoardStyle: CSSProperties = { 
				paddingTop: '20px',
				paddingLeft: '10px',
	fontFamily: 'Roboto, sans-serif', left: '0%', top: '40%', width: '100%', height: '40%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }

export const StoryBooleanReturns: React.FC = () => {
  return (
		<Story id="StoryBooleanReturns" width={720} height={720} subtitles={booleanReturnsSutitles}  >

    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Roboto, sans-serif', }}>

      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ThreeDFrame cameraDistance={8} lookAtY={0} cameraY={0}>
						<directionalLight castShadow position={[10, 20, 15]} intensity={15} color={0xffffff} />	
						<LightSource actor="blaster temperature" position={[0, 0, 15]} color="#ff0000" />
						<GroupInitialState rotation={[0, Math.PI * 3 / 2, 0]} position={[-5, 0, 0]} scale={0.15}>
							<Explosion actor="blaster explosion" />
						</GroupInitialState>
						<GroupInitialState rotation={[0, Math.PI, 0]} position={[-3, 3.5, 0]} scale={1}>
            <ThreeAnimationEffect actor="blaster assembly" >
								<Blaster actor="blaster"/>
								<GroupInitialState rotation={[0, 0, Math.PI * 3 / 2]} position={[0, 0, 0]} scale={1}>
									<RocketPlume actor="blaster fire" position={[-0.6, -3, 0.3]} scale={1.8}/>
								</GroupInitialState>
            </ThreeAnimationEffect>
						</GroupInitialState>
          </ThreeDFrame>
				</AbsoluteFill>
			</AnimationEffect>

			<CodeHighlight actor="caller" codeString={caller} style={{ left: '5%', top: '35%', width: '60%', height: '20%', }}>
				<Anchor actor="caller-fire" style={{left: "245px", top: "80px"}}/>
			</CodeHighlight>
			<CodeHighlight actor="callee" codeString={codeString} style={{ left: '35%', top: '65%', width: '60%', height: '50%', }}>
				<Anchor actor="callee-fire" style={{left: "150px", top: "25px"}}/>
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

    <Markdown actor="learning from not return" style={announceBoardStyle}
			md={learningFromException}
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
    }}>Why Are My Boolean Return Values Are Sometimes Bad?</span>

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