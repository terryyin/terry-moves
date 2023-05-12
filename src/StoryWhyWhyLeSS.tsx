
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { OddeLogo } from './parts/OddeLogo';
import { OddeLogoInner } from './parts/OddeLogoInner';
import { FlipCoin } from './video_components/AutonomousComponents/FlipCoin';
import { Subtitles } from './video_components/Subtitles';
import AnimationEffect from './video_components/AnimationEffect';
import { ScalableScrum, empiricalActions, growScrum1Actions, scaleScrumActions } from './stories/scrum';
import { Anchor } from './video_components/Anchor';
import { Scrum } from './parts/Scrum';
import * as THREE from 'three';
import { GroupInitialState } from './video_components/GroupInitialState';
import { BoxWithText } from './video_components/BoxWithText';
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';
import { CalloutCloud } from './video_components/CalloutCloud';

export const whyWhyLeSSSubtitles: Subtitle[] = [
{ leadingBlank: 1, duration: 5, text: 'The creators and trainers of Large-Scale Scrum have subtly updated the "Why LeSS?" article.', actions: [
	{ actor: "overview", actionType: "appear", endingTimeAdjustment: 0, endDuration: 2,  persistUntilSubtitleId: "letsdelve"},
	{ actor: "overview", actionType: "scale", duration: 4, outputRange: [1, 6]},
	{ actor: "overview", actionType: "move", duration: 4, absolutePosition: [0, 190, 0]},

	{ actor: 'team PO1', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'team PO2', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'team PO3', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role4', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role5', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role6', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role7', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role8', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role9', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role10', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role11', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role12', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role13', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role14', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role15', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role16', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role17', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role18', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
	{ actor: 'role19', actionType: 'move', duration: 0, absolutePosition: [0, 20, 0] },
]},
{ leadingBlank: 1, duration: 5, text: 'This update shifts focus from scaling Scrum to achieving organizational adaptiveness.', actions: []},
{ id: "letsdelve", leadingBlank: 1, duration: 3, text: `Let's delve into these changes.`, actions: [
]},
{ leadingBlank: 1, duration: 5, text: '"Why LeSS?" was penned by Bas and Craig as the foundational reasoning behind LeSS.', actions: [
	{ actor: "page", actionType: "rotate and rise", duration: 2, value: 100},
]},
{ leadingBlank: 1, duration: 5, text: 'The earlier version of the article emphosized that Large-Scale Scrum is Scrum.', actions: [
	{ actor: "page", actionType: "move", duration: 2, absolutePosition: [800, 0, 0]},
	...growScrum1Actions,
]},
{ leadingBlank: 1, duration: 4, text: 'It depicted LeSS as a framework to scale Scrum,', actions: [
	...scaleScrumActions,
]},
{ leadingBlank: 0, duration: 4, text: 'keeping its essence intact.', actions: [
	{ actor: "center", actionType: "connect to",  startDuration: 1, target: "adjust-direction", bentLevel: -100, endingTimeAdjustment: 3},
	...empiricalActions,
]},
{ leadingBlank: 1, duration: 10, text: `While this depiction still holds true, the term 'Scrum' has grown increasingly nebulous.`, actions: [
		{ actor: 'scrum stage', actionType: 'scale', duration: 1, outputRange: [1, 0.4] },
		{ actor: 'scrum stage', actionType: 'move', duration: 1, absolutePosition: [600, 600] },
		{ actor: "wrong scrum 1", actionType: "additive value change to", duration: 2, value: 1},
		{ actor: "wrong scrum 2", actionType: "additive value change to", duration: 2, value: 1},
		{ actor: "wrong scrum 3", actionType: "additive value change to", duration: 2, value: 1},
		{ actor: 'team PO1', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 3 },
		{ actor: 'team PO2', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 3.5 },
		{ actor: 'team PO3', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 4 },
		{ actor: 'role4', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 4.4 },
		{ actor: 'role5', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 4.8 },
		{ actor: 'role6', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 5.1 },
		{ actor: 'role7', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 5.4 },
		{ actor: 'role8', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 5.7 },
		{ actor: 'role9', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 5.9 },
		{ actor: 'role10', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 6.1 },
		{ actor: 'role11', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 6.3 },
		{ actor: 'role12', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 6.4 },
		{ actor: 'role13', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 6.5 },
		{ actor: 'role14', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 6.55 },
		{ actor: 'role15', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 6.6 },
		{ actor: 'role16', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 6.63 },
		{ actor: 'role17', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 7 },
		{ actor: 'role18', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 7 },
		{ actor: 'role19', actionType: 'move', duration: 1, absolutePosition: [0, 0, 0], offset: 7 },
		{ actor: "camera", actionType: "camera look at", duration: 4, absolutePosition: [0, 3, 0], offset: 4 },
		{ actor: "camera", actionType: "move", duration: 2, absolutePosition: [0, 20, 0], offset: 8 },
		{ actor: 'where is scrum', actionType: 'appear', startDuration: 0.5, endingTimeAdjustment: 3, offset: 8 },

]},
{ leadingBlank: 1, duration: 5, text: 'The updated version underscores the essence of LeSS - prioritizing systems thinking, simpler structures, and continuous improvement for building adaptable organizations.', actions: [
		{ actor: 'wrong scrum stage', actionType: 'scale', duration: 1, outputRange: [1, 0.3] },
		{ actor: 'wrong scrum stage', actionType: 'move', duration: 1, absolutePosition: [-900, 900] },
		{ actor: "camera", actionType: "camera look at", duration: 1, absolutePosition: [0, 0, 0] },
		{ actor: "camera", actionType: "move", duration: 1, absolutePosition: [0, 0, 0] },
]},
{ leadingBlank: 1, duration: 5, text: 'This essence is embodied in the principles of LeSS.', actions: []},
{ leadingBlank: 1, duration: 5, text: 'The revised "LeSS Complete Picture" visually represents the equilibrium between abstract principles and concrete practices.', actions: []},
{ leadingBlank: 1, duration: 5, text: 'The LeSS rules, serving as the minimal core structure, replace prescriptive frameworks. This emphasizes that LeSS is less about adhering to a rigid framework and more about abiding by minimal guiding rules.', actions: []},
{ leadingBlank: 1, duration: 5, text: 'The Guides and Experiments remain unchanged.', actions: []},
{ leadingBlank: 1, duration: 5, text: 'A new arrow pointing out from the principles at the core of the diagram has been introduced.', actions: []},
{ leadingBlank: 1, duration: 5, text: 'This arrow signifies that principles guide experimentation and adoption.', actions: []},
{ leadingBlank: 1, duration: 5, text: `The latest version underscores that LeSS aims to amplify an organization's "adaptiveness," reverting to the original intent of agile development.`, actions: []},
{ leadingBlank: 1, duration: 5, text: 'This adaptiveness is defined as:', actions: []},
{ leadingBlank: 1, duration: 5, text: 'The capacity to change direction at a relatively low cost, primarily through discovery via frequent delivery, and...', actions: []},
{ leadingBlank: 1, duration: 5, text: 'Maximizing value delivered to customers and end-users.', actions: []},
{ leadingBlank: 1, duration: 5, text: 'Lastly, the updated article sheds light on the origins of LeSS, serving as a prime example of the principles-guided experiments.', actions: []},

		{ leadingBlank: 0, duration: 4, text: "Principles that guide experimentation and adoption.", actions: [
			{ actor: "scrum1", actionType: "additive value change to", duration: 4, value: 1},
		]},
		{ leadingBlank: 0, duration: 5, text: "Principles that guide experimentation and adoption.", actions: [
			{ actor: "scrum2", actionType: "additive value change to", duration: 0.1, value: 1},
			{ actor: "scrum3", actionType: "additive value change to", duration: 0.1, value: 1},
			{ actor: "bending1", actionType: "additive value change to", duration: 3, value: 0},
			{ actor: "bending2", actionType: "additive value change to", duration: 3, value: 0.44},
			{ actor: "bending3", actionType: "additive value change to", duration: 3, value: 0.88},
		]},
		{ leadingBlank: 0, duration: 4, text: "Principles that guide experimentation and adoption.", actions: [
			{ actor: "scrum head", actionType: "additive value change to", duration: 2, value: 0.4},
		]},
];

export const StoryWhyWhyLeSS: React.FC = () => {
  return (
		<Story id="StoryWhyWhyLeSS" width={720} height={720} subtitles={whyWhyLeSSSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<Anchor actor="center" style={{left: "50%", top: "45%"}}/>
			<Anchor actor="adjust-direction" style={{left: "70%", top: "50%"}}/>
			<AnimationEffect actor="scrum stage" style={{}}>
				<ThreeDFrame cameraDistance={6} lookAtY={0} lookAtZ={0} cameraY={-1}>
					<pointLight position={[10, 10, 10]} />
					<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
					<ScalableScrum />
				</ThreeDFrame>
			</AnimationEffect>
			<AnimationEffect actor="wrong scrum stage" style={{}}>
				<ThreeDFrame cameraDistance={12} lookAtY={0} lookAtZ={0} cameraY={-1}>
					<pointLight position={[10, 10, 10]} />
					<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
					<GroupInitialState position={[-3, 1, -2]}>
						<Scrum actor="wrong scrum 1" headActor="x" bendingActor="x" color={new THREE.Color(0x440000) } rotationZ={Math.PI/2} />
					</GroupInitialState>
					<GroupInitialState position={[0, 1, -2]}>
						<Scrum actor="wrong scrum 2" headActor="x" bendingActor="x" color={new THREE.Color(0x440000) } rotationZ={Math.PI/2} />
					</GroupInitialState>
					<GroupInitialState position={[3, 1, -2]}>
						<Scrum actor="wrong scrum 3" headActor="x" bendingActor="x" color={new THREE.Color(0x440000) } rotationZ={Math.PI/2} />
					</GroupInitialState>
					<ThreeAnimationEffect actor="team PO1" position={[-4, 5, 0]}>
						<BoxWithText actor="wrong scrum head" text="Team PO" />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="team PO2" position={[0, 5, 0]}>
						<BoxWithText actor="wrong scrum head" text="Team PO" />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="team PO3" position={[4, 5, 0]}>
						<BoxWithText actor="" text="Team PO" />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role4" position={[-5, 7, 0]}>
						<BoxWithText actor="" text="BA" />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role5" position={[-1, 7, 0]}>
						<BoxWithText actor="" text="QA" />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role6" position={[2.5, 7, 0]}>
						<BoxWithText actor="" text="DevOps" />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role7" position={[5.9, 7, 0]}>
						<BoxWithText actor="" text="Architect" />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role8" position={[-4.5, 9, 0]}>
						<BoxWithText actor="" text={`Choo Choo\nConductor`} />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role9" position={[-1.0, 9, 0]}>
						<BoxWithText actor="" text="Chief PO" />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role10" position={[2.8, 9, 0]}>
						<BoxWithText actor="" text={`Project\nManger`} />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role11" position={[6, 9, 0]}>
						<BoxWithText actor="" text={`Jira\nMaster`} />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role12" position={[-4, 11, 0]}>
						<BoxWithText actor="" text={`Program\nManager`} />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role13" position={[0, 11, 0]}>
						<BoxWithText actor="" text={`Chief\nScrumMaster`} />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role14" position={[3.5, 11, 0]}>
						<BoxWithText actor="" text={`OOO\nManager`} />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role15" position={[-3.5, 13, 0]}>
						<BoxWithText actor="" text={`XXX\nManager`} />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role16" position={[0.5, 13, 0]}>
						<BoxWithText actor="" text={`Renamed\nManager`} />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role17" position={[5, 13, 0]}>
						<BoxWithText actor="" text={`Status Quo\nManager`} />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role18" position={[-2, 15, 0]}>
						<BoxWithText actor="" text="CTO" />
					</ThreeAnimationEffect>
					<ThreeAnimationEffect actor="role19" position={[2, 15, 0]}>
						<BoxWithText actor="" text="CIO" />
					</ThreeAnimationEffect>
				</ThreeDFrame>
			</AnimationEffect>
	
			<AnimationEffect actor="overview" style={{ width: "100%", top: "30%" }}>
				<Img src={staticFile('assets/less/LeSS-overview-diagram.png')} style={{ width: "100%" }}/>
			</AnimationEffect>
			<AnimationEffect actor="page" style={{ width: "80%", left: "10%", top: "10%" }}>
				<Img src={staticFile('assets/less/why-less-page.png')} style={{ width: "100%" }}/>
			</AnimationEffect>
			<CalloutCloud actor='where is scrum' style={{top: '60%', left: "30%"}} tailShift={-60} tailHeightPx={20}>
				<span style={{ fontSize: '30px', margin: 0 }} > 🤔 Hmm, where is Scrum?  </span>
			</CalloutCloud>
			<AbsoluteFill style={{ left: '83%', top: '4.6%', width: '10%', height: '20%'}}>
				<span style={{fontSize: '20px', fontFamily: "Poppins, sans serif"}}>terry@</span>
			</AbsoluteFill>
			<AbsoluteFill style={{ left: '90%', top: '2%', width: '10%', height: '20%'}}>
				<OddeLogo />
				<FlipCoin speed={2} interval={20} shift={1} >
					<OddeLogoInner />
				</FlipCoin>
			</AbsoluteFill>
			<AnimationEffect actor="subtitles">
				<Subtitles scale={1} language="zhTW"/>
			</AnimationEffect>
		</AbsoluteFill>
		</Story>
  );
};
