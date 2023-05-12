
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { Scrum } from './parts/Scrum';
import { OddeLogo } from './parts/OddeLogo';
import { OddeLogoInner } from './parts/OddeLogoInner';
import { FlipCoin } from './video_components/AutonomousComponents/FlipCoin';

export const whyWhyLeSSSubtitles: Subtitle[] = [
{ leadingBlank: 1, duration: 5, text: 'The creators and trainers of Large-Scale Scrum have subtly updated the "Why LeSS?" article.', actions: []},
{ leadingBlank: 1, duration: 5, text: 'This update shifts focus from scaling Scrum to achieving organizational adaptiveness.', actions: []},
{ leadingBlank: 1, duration: 5, text: `Let's delve into these changes.`, actions: []},
{ leadingBlank: 1, duration: 5, text: '"Why LeSS?" was penned by Bas and Craig as the foundational reasoning behind LeSS.', actions: []},
{ leadingBlank: 1, duration: 5, text: 'The earlier version of the article depicted LeSS as a framework to scale Scrum, keeping its essence intact.', actions: []},
{ leadingBlank: 1, duration: 5, text: `While this depiction still holds true, the term 'Scrum' has grown increasingly nebulous.`, actions: []},
{ leadingBlank: 1, duration: 5, text: 'The updated version underscores the essence of LeSS - prioritizing systems thinking, simpler structures, and continuous improvement for building adaptable organizations.', actions: []},
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
			<ThreeDFrame cameraDistance={6} lookAtY={0} lookAtZ={0} cameraY={-1}>
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<Scrum actor="scrum1" headActor='scrum head' bendingActor='bending1'/>
				<Scrum actor="scrum2" headActor='scrum head' bendingActor="bending2"/>
				<Scrum actor="scrum3" headActor='scrum head' bendingActor="bending3"/>
			</ThreeDFrame>
		<AbsoluteFill style={{ left: '83%', top: '4.6%', width: '10%', height: '20%'}}>
			<span style={{fontSize: '20px', fontFamily: "Poppins, sans serif"}}>terry@</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '90%', top: '2%', width: '10%', height: '20%'}}>
			<OddeLogo />
			<FlipCoin speed={2} interval={4} shift={1} >
			  <OddeLogoInner />
			</FlipCoin>
		</AbsoluteFill>
		</AbsoluteFill>
		</Story>
  );
};
