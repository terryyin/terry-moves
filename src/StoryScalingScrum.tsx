import * as THREE from 'three';

import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { ThreeDArrow } from './video_components/ThreeDArrow';

export const scalingScrumSubtitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 10, text: "Principles that guide experimentation and adoption.", actions: [
			{ actor: "arrow", actionType: "additive value change to", duration: 10, value: 1},
		]},
];


export const StoryScalingScrum: React.FC = () => {
  return (
		<Story id="StoryScalingScrum" width={720} height={720} subtitles={scalingScrumSubtitles}  >
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={4} lookAtY={0} lookAtZ={-6} cameraY={0}>
				{/* <ambientLight intensity={0.5} /> */}
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<ThreeDArrow actor="arrow" tubeRadius={0.2} color={new THREE.Color(0x750000)} points={[new THREE.Vector3(0.3, -0.5, -6), new THREE.Vector3(1.6, -1.2, 1), new THREE.Vector3(1, -2.4, 0.5), new THREE.Vector3(0.9, -2.1, 0.3), new THREE.Vector3(0.7, 4.1, -2)]}/>
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
