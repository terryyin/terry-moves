
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { Story } from './video_components/Story';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { GameOfLifeAnimated } from './parts/GameOfLifeAnimated';

export const transparentSubtitles: Subtitle[] = [
{ leadingBlank: 0, duration: 10, text: '', actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 10, value: 100},
  { actor: "camera", actionType: "move", duration: 10, absolutePosition: [20, 20, 0],},
]},
];

const gosperGliderGun = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 10, y: 0 },
  { x: 10, y: -1 },
  { x: 10, y: 1 },
  { x: 11, y: -2 },
  { x: 11, y: 2 },
  { x: 12, y: -3 },
  { x: 12, y: 3 },
  { x: 13, y: -3 },
  { x: 13, y: 3 },
  { x: 14, y: 0 },
  { x: 15, y: -2 },
  { x: 15, y: 2 },
  { x: 16, y: -1 },
  { x: 16, y: 1 },
  { x: 17, y: 0 },
  { x: 20, y: -1 },
  { x: 20, y: -2 },
  { x: 20, y: -3 },
  { x: 21, y: -1 },
  { x: 21, y: -2 },
  { x: 21, y: -3 },
  { x: 22, y: -4 },
  { x: 22, y: 0 },
  { x: 24, y: -5 },
  { x: 24, y: -4 },
  { x: 24, y: 0 },
  { x: 24, y: 1 },
  { x: 34, y: -2 },
  { x: 34, y: -3 },
  { x: 35, y: -2 },
  { x: 35, y: -3 },
].map(({x, y}) => ({x: x - 17, y: y - 1}));


export const StoryGameOfLife: React.FC = () => {
  return (
		<Story id="StoryGameOfLife" width={720} height={720} subtitles={transparentSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={0} lookAtY={0} lookAtZ={-2} cameraY={8} cameraZ={8}>
				{/* <ambientLight intensity={0.5} /> */}
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<GameOfLifeAnimated actor="gol" startLives={gosperGliderGun} />
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
