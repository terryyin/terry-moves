import React  from 'react';

import { Subtitle } from './models/Subtitles';
import { AbsoluteFill, staticFile } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { TwoDImage } from './video_components/TwoDImage';
import { GroupInitialState } from './video_components/GroupInitialState';

export const booleanReturnsSutitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 3, text: "Welcome back to the Oh My Bad Boolean Series!", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [-6, 0, -3] },
		]}

];

export const StoryLeSSComplete: React.FC = () => {
  return (
		<Story id="StoryLeSSComplete" width={720} height={720} subtitles={booleanReturnsSutitles}  >
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Roboto, sans-serif', }}>
			<ThreeDFrame cameraDistance={4} lookAtY={0} lookAtZ={-3} cameraY={0}>
				<directionalLight castShadow position={[10, 20, 15]} intensity={10} color={0xffffff} />	
				<GroupInitialState rotation={[0, 0, 0]} position={[0, 0, -1]} scale={1.25}>
					<TwoDImage url={staticFile("assets/less/complete/complete-guides.png")} />
				</GroupInitialState>
				<TwoDImage url={staticFile("assets/less/complete/complete-experiments.png")} />
				<TwoDImage url={staticFile("assets/less/complete/complete-principles.png")} />
				<TwoDImage url={staticFile("assets/less/complete/complete-rules.png")} />
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};