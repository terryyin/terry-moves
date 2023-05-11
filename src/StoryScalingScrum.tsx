
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { Scrum } from './parts/Scrum';

export const scalingScrumSubtitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 10, text: "Principles that guide experimentation and adoption.", actions: [
			{ actor: "arrow", actionType: "additive value change to", duration: 10, value: 1},
		]},
];

export const StoryScalingScrum: React.FC = () => {
  return (
		<Story id="StoryScalingScrum" width={720} height={720} subtitles={scalingScrumSubtitles}  >
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={5} lookAtY={0} lookAtZ={-6} cameraY={-1}>
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<Scrum actor="scrum1" />
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
