
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { Story } from './video_components/Story';
import { Scrum } from './parts/Scrum';

export const scalingScrumSubtitles: Subtitle[] = [
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

export const StoryScalingScrum: React.FC = () => {
  return (
		<Story id="StoryScalingScrum" width={720} height={720} subtitles={scalingScrumSubtitles}  >
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={6} lookAtY={0} lookAtZ={0} cameraY={-1}>
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<Scrum actor="scrum1" headActor='scrum head' bendingActor='bending1'/>
				<Scrum actor="scrum2" headActor='scrum head' bendingActor="bending2"/>
				<Scrum actor="scrum3" headActor='scrum head' bendingActor="bending3"/>
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
