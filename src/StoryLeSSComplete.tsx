import * as THREE from 'three';

import { Subtitle } from './models/Subtitles';
import { AbsoluteFill, staticFile } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { TwoDImage } from './video_components/TwoDImage';
import { ThreeDArrow } from './video_components/ThreeDArrow';

export const lessCompletePictureSubtitles: Subtitle[] = [
		{ leadingBlank: 1, duration: 3, text: "LeSS provides a minimal barely sufficient core: the LeSS rules. And on top of that it encourages experimentation influenced by the LeSS principles.", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [0, 0, -8] },
			{ actor: "arrow", actionType: "additive value change to", duration: 0, value: 0},
		]},
		{ leadingBlank: 1, duration: 3, text: "It has rules that provide a minimum core structure.", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [-6, 0, -3] },
			{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, 0, 3] },
		]},
		{ leadingBlank: 0, duration: 3, text: "Principles that guide experimentation and adoption.", actions: [
			{ actor: "arrow", actionType: "additive value change to", duration: 3, value: 0.58},
		]},
		{ leadingBlank: 0, duration: 3, text: "And this is called a 'LeSS Complete Picture'", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [0, 0, 0] },
			{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, 0, 0] },
		]},
		{ leadingBlank: 1, duration: 5, text: "And this is called a 'LeSS Complete Picture'", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [6, 0, -3] },
			{ actor: "arrow", actionType: "additive value change to", duration: 3, value: 1},
			{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, 0, 3] },
		]},
];


export const StoryLeSSComplete: React.FC = () => {
  return (
		<Story id="StoryLeSSComplete" width={720} height={720} subtitles={lessCompletePictureSubtitles}  >
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={4} lookAtY={0} lookAtZ={-6} cameraY={0}>
				{/* <ambientLight intensity={0.5} /> */}
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<TwoDImage actor="experiments" rotation={[0, 0, 0]} position={[0, 0, 0]} scale={1} url={staticFile("assets/less/complete/complete-experiments.png")} />
				<TwoDImage actor="guides" rotation={[0, 0, 0]} position={[0, 0, -2]} scale={1.5} url={staticFile("assets/less/complete/complete-guides.png")} />
				<TwoDImage actor="rules" rotation={[0, 0, 0]} position={[0, 0, -4]} scale={1.98} url={staticFile("assets/less/complete/complete-rules.png")} />
				<TwoDImage actor="principles" rotation={[0, 0, 0]} position={[0, 0, -6]} scale={2.4} url={staticFile("assets/less/complete/complete-principles.png")} />
				<ThreeDArrow actor="arrow" points={[new THREE.Vector3(0.3, -0.5, -6), new THREE.Vector3(1.6, -1.2, 1), new THREE.Vector3(1, -2.4, 0.5), new THREE.Vector3(0.9, -2.1, 0.3), new THREE.Vector3(0.6, -2.1, -5), new THREE.Vector3(0.3, -1.1, -6)]}/>
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};