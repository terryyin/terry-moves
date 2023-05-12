
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { ScalableScrum, empiricalActions, growScrum1Actions, scaleScrumActions } from './stories/scrum';

export const scalingScrumSubtitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 4, text: "Principles that guide experimentation and adoption.", actions: [
			...growScrum1Actions,
		]},
		{ leadingBlank: 0, duration: 5, text: "Principles that guide experimentation and adoption.", actions: [
			...scaleScrumActions,
		]},
		{ leadingBlank: 0, duration: 4, text: "Principles that guide experimentation and adoption.", actions: [
			...empiricalActions,
		]},
];

export const StoryScalingScrum: React.FC = () => {
  return (
		<Story id="StoryScalingScrum" width={720} height={720} subtitles={scalingScrumSubtitles}  >
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={6} lookAtY={0} lookAtZ={0} cameraY={-1}>
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<ScalableScrum />
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
