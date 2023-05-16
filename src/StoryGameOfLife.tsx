
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { Story } from './video_components/Story';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { GameOfLife3D } from './parts/GameOfLife3D';

export const transparentSubtitles: Subtitle[] = [
{ leadingBlank: 1, duration: 3, text: 'The creators and trainers of Large-Scale Scrum have subtly updated the "Why LeSS?" article.', actions: [
	{ actor: "slice", actionType: "scale", duration: 2, outputRange: [1, 8]},
	{ actor: "slice", actionType: "move", duration: 2, absolutePosition: [80, 0]},

]},
];

export const StoryGameOfLife: React.FC = () => {
  return (
		<Story id="StoryGameOfLife" width={720} height={720} subtitles={transparentSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={4} lookAtY={0} lookAtZ={0} cameraY={2}>
				{/* <ambientLight intensity={0.5} /> */}
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<GameOfLife3D lives={[{x: -1, y: 0}, {x: 1, y: 1}, {x: 2, y: 0}]} />
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
