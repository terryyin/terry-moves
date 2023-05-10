import React  from 'react';

import { Subtitle } from './models/Subtitles';
import { AbsoluteFill, staticFile } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { TwoDImage } from './video_components/TwoDImage';
import * as THREE from 'three';

export const booleanReturnsSutitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 3, text: "Welcome back to the Oh My Bad Boolean Series!", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [0, 0, -8] },
		]},
		{ leadingBlank: 2, duration: 3, text: "Welcome back to the Oh My Bad Boolean Series!", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [-6, 0, -3] },
			{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, 0, 3] },
		]}
];


const StaticLineAndArrow: React.FC = () => {
	const startPoint = new THREE.Vector3(0, -1, -6);
  const endPoint = new THREE.Vector3(0, -4, 0);
  const middlePoint = new THREE.Vector3(0, -2, -3);

  // Create a curved line
  const curve = new THREE.CatmullRomCurve3([startPoint, middlePoint, endPoint]);
  const tubeRadius = 0.1;
  const tubeGeometry = new THREE.TubeGeometry(curve, 50, tubeRadius, 8, false);
  const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

  // Calculate arrow properties
  const arrowDirection = curve.getTangentAt(1); // Get the tangent at the end of the curve
  const arrowLength = startPoint.distanceTo(endPoint) * 0.2; // Adjust the length of the arrow as needed
  const arrowColor = new THREE.Color(0xff0000);


  return (
		<>
		<mesh geometry={tubeGeometry} material={tubeMaterial} />
		<arrowHelper args={[arrowDirection, startPoint, arrowLength, arrowColor]} />
		<arrowHelper args={[arrowDirection, endPoint, arrowLength, arrowColor]} />

		</>
  );
};

export default StaticLineAndArrow;


export const StoryLeSSComplete: React.FC = () => {
  return (
		<Story id="StoryLeSSComplete" width={720} height={720} subtitles={booleanReturnsSutitles}  >
    <AbsoluteFill style={{}}>
			<ThreeDFrame cameraDistance={4} lookAtY={0} lookAtZ={-6} cameraY={0}>
				<directionalLight castShadow position={[10, 20, 15]} intensity={10} color={0xffffff} />	
				<TwoDImage actor="experiments" rotation={[0, 0, 0]} position={[0, 0, 0]} scale={1} url={staticFile("assets/less/complete/complete-experiments.png")} />
				<TwoDImage actor="guides" rotation={[0, 0, 0]} position={[0, 0, -2]} scale={1.5} url={staticFile("assets/less/complete/complete-guides.png")} />
				<TwoDImage actor="rules" rotation={[0, 0, 0]} position={[0, 0, -4]} scale={1.98} url={staticFile("assets/less/complete/complete-rules.png")} />
				<TwoDImage actor="principles" rotation={[0, 0, 0]} position={[0, 0, -6]} scale={2.4} url={staticFile("assets/less/complete/complete-principles.png")} />
				<StaticLineAndArrow />
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};