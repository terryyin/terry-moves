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
import { CalloutCloud } from './video_components/CalloutCloud';
import HealthBar from './video_components/HealthBar';
import { LightSource } from './video_components/LightSource';
import { Markdown } from './video_components/Markdown';
import { Explosion } from './parts/Explosion';
import { Subtitles } from './video_components/Subtitles';
import { Anchor } from './video_components/Anchor';

export const booleanReturnsSutitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 3, text: "Welcome back to the Oh My Bad Boolean Series!", actions:[
			  { actor: "blaster assembly", actionType: "oscillate", delta: [0, 0.02, 0]},

		] },
		{ leadingBlank: 1, duration: 4, text: "Today's question: Why Are My Boolean Return Values Sometimes Bad?", actions:[
		] },
		{ leadingBlank: 1, duration: 4, text: "And real my STYLE with my code", actions:[
				{ actor: "second title", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 1, text: "and real my STYLE with my code", startDuration: 1, endDuration: 1 },
		] },
		{ leadingBlank: 1, duration: 5, text: "Oops, sorry, not 'my STYLE'. Should be 'Intention'.", actions:[
				{ actor: "second title", actionType: "replace text", endingTimeAdjustment: 4, line: 1, match: "my STYLE", replacement: "intention", startDuration: 0, endDuration: 2 },
		] },
		{ leadingBlank: 1, duration: 4, text: "You might recall the Blaster from my previous episode. You could fire it anytime, as long as you have ammo!", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "The Blaster's fire function returned a boolean value, which was confusing. What did it mean? Shot successful? No ammo left?", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "This forced actions on callers, like writing a log. When failing to fire is a surprise, the function should throw an exception.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "Avoiding forced actions on callers improves code readability. For checking ammo, add a separate hasAmmo function.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "This follows the Command-Query Separation principle, leading to cleaner, more maintainable code.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "Now, let's discuss functions returning an internal state, leading to losing domain concepts and violating Tell, Don't Ask.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "The Blaster has a getSafetyStatus function, making callers responsible for safety. This can lead to feature envy, code duplication, and loss of domain concepts.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "Instead, use ensureSafetyOn and ensureSafetyOff methods. This way, callers don't handle the internal state, preserving domain concepts and making the code more modular.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "Direct mapping from the problem domain to the solution domain is often preferred, but exceptions exist.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "In conclusion, be cautious with ambiguous boolean return values. Use meaningful return values, follow Tell, Don't Ask, and adhere to Command-Query Separation.", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "This will lead to cleaner, more maintainable code and fewer headaches for you, the developer!", actions:[] },
		{ leadingBlank: 1, duration: 4, text: "Remember, boolean return values aren't inherently evil, but can contribute to ambiguity and other issues.", actions:[] },
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

export const StoryBooleanReturns: React.FC = () => {
  return (
		<Story id="StoryBooleanReturns" width={720} height={720} subtitles={booleanReturnsSutitles}  >
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
		<CodeHighlight actor="caller 1" codeString={caller1} style={{ left: '5%', top: '32%', width: '40%', height: '20%', }}>
			<Anchor actor="a1-action" style={{left: "50%", top: "20px"}}/>
			<Anchor actor="a1-param" style={{left: "78%", top: "35px"}}/>
		</CodeHighlight>
		<CodeHighlight actor="caller 2" codeString={caller2} style={{ left: '5%', top: '52%', width: '40%', height: '20%', }}>
			<Anchor actor="a2-action" style={{left: "50%", top: "20px"}}/>
			<Anchor actor="a2-param" style={{left: "78%", top: "35px"}}/>
		</CodeHighlight>
		<CodeHighlight actor="caller 3" codeString={caller3} style={{ left: '5%', top: '74%', width: '40%', height: '20%', }}>
			<Anchor actor="a3-action" style={{left: "50%", top: "20px"}}/>
			<Anchor actor="a3-param" style={{left: "78%", top: "35px"}}/>
		</CodeHighlight>
		<CodeHighlight actor="callee" codeString={codeString} style={{ left: '55%', top: '30%', width: '40%', height: '50%', }}>
			<Anchor actor="callee-action" style={{left: "15px", top: "25px"}}/>
			<Anchor actor="callee-load" style={{left: "60px", top: "75px"}}/>
			<Anchor actor="callee-fire" style={{left: "60px", top: "125px"}}/>
			<Anchor actor="callee-loadedfire" style={{left: "15px", top: "120px"}}/>
		</CodeHighlight>

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
		<CalloutCloud actor='teammate callout' style={{top: '13%', left: "calc(100% - 180px)"}} tailShift={110}>
			<span style={{ fontSize: '30px', margin: 0 , backgroundColor: "#ffaaaa"}} > Ouch! Hey!  </span>
		</CalloutCloud>

    <AnimationEffect actor="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}/>

    <Markdown actor="learning from tight coupling" style={announceBoardStyle}
			md={learningCoupling}
		 />
    <Markdown actor="learning from low cohesion" style={announceBoardStyle}
			md={learningCohesion}
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
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#408fdd", textAlign: 'center'}}>Loose<br/>Coupling</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '90%',  top: '0.5%', width: '10%', height: '10%'}}>
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#ff8e00", textAlign: 'center'}}>high<br/>Cohesion</span>
		</AbsoluteFill>
		<HealthBar leftSide actor="loose coupling health bar" style={{ left: '10%', top: '2.4%', width: '40%', height: '3%'}}/>
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