
import {random} from 'remotion'
import {interpolate} from 'remotion'
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { Story } from './video_components/Story';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { GameOfLifeAnimated } from './parts/GameOfLifeAnimated';
import { Cell } from './parts/gameOfLife';

export const transparentSubtitles: Subtitle[] = [
{ leadingBlank: 0, duration: 20, text: '', actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 15, value: 200},
  { actor: "camera", actionType: "move", duration: 10, absolutePosition: [20, 30, 0],},
]},
];


export function generateRandomCells(n: number, d: number, seed: number): Cell[] {
  // Calculate the size of the grid
  const gridSize = Math.ceil(Math.sqrt(n / d));

  // Create an empty array to hold the cells
  const cells: Cell[] = [];

  // Keep generating cells until we have enough
  while (cells.length < n) {
    const x = Math.floor(interpolate(random(seed++), [0, 1], [-gridSize/2, gridSize/2]));
    const y = Math.floor(interpolate(random(seed++), [0, 1], [-gridSize/2, gridSize/2]));

    // Only add the cell if it's not already in the array
    if (!cells.some(cell => cell.x === x && cell.y === y)) {
      cells.push({ x, y });
    }
  }

  return cells;
}

// Const gliders: Cell[] = generateRandomCells(30, 0.2, 0);
const gliders: Cell[] = generateRandomCells(2000, 0.3, 10000);

export const StoryGameOfLife: React.FC = () => {
  return (
		<Story id="StoryGameOfLife" width={720} height={720} subtitles={transparentSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={0} lookAtY={0} lookAtZ={-2} cameraY={8} cameraZ={8}>
				{/* <ambientLight intensity={0.5} /> */}
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<GameOfLifeAnimated actor="gol" startLives={gliders} />
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
