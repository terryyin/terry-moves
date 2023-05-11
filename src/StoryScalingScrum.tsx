
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { Scrum } from './parts/Scrum';

export const scalingScrumSubtitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 4, text: "Principles that guide experimentation and adoption.", actions: [
			{ actor: "scrum1", actionType: "additive value change to", duration: 4, value: 1},
		]},
		{ leadingBlank: 0, duration: 4, text: "Principles that guide experimentation and adoption.", actions: [
			{ actor: "scrum head", actionType: "additive value change to", duration: 4, value: 0.3},
		]},
];

export const StoryScalingScrum: React.FC = () => {
  return (
		<Story id="StoryScalingScrum" width={720} height={720} subtitles={scalingScrumSubtitles}  >
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={5} lookAtY={0} lookAtZ={-6} cameraY={-1}>
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<Scrum actor="scrum1" headActor='scrum head'/>
				<Scrum actor="scrum2" headActor='scrum head'/>
				<Scrum actor="scrum3" headActor='scrum head'/>
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
