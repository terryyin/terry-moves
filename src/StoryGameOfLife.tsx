
import {random} from 'remotion'
import {interpolate} from 'remotion'
import { Subtitle } from './models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { Story } from './video_components/Story';
import { ThreeDFrame } from './video_components/ThreeDFrame';
import { GameOfLifeAnimated } from './parts/gameOfLife/GameOfLifeAnimated';
import { Cell } from './parts/gameOfLife/gameOfLife';
import { Subtitles } from './video_components/Subtitles';
import AnimationEffect from './video_components/AnimationEffect';

export const transparentSubtitles: Subtitle[] = [

{ leadingBlank: 0, duration: 4, text: `On an infinite, two-dimensional grid filled with square cells`, actions: [
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0, value: 0},
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0, value: 0},
  { actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 20, -40],},
  { actor: "camera", actionType: "camera look at", duration: 0, absolutePosition: [0, 0, -30],},
	{ actor: "gol", actionType: "additive value change to", duration: 4, value: 100},
  { actor: "camera", actionType: "move", duration: 2, absolutePosition: [-1, 2, -0.4], offset: 3},
  { actor: "camera", actionType: "camera look at", duration: 2, absolutePosition: [0.7, 0, -0.6], offset: 3},
]},
{ leadingBlank: 1, duration: 7, text: `Each cell expresses one of two states: alive or dead.`, actions: [
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 3},
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 5},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 5},
]},
{ leadingBlank: 1, duration: 4, text: `Each cell has eight neighbour cells`, actions: [
	{ actor: "neighboursDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 4},
]},
{ leadingBlank: 1, duration: 5, text: `the living cell will die if it has one or no neighour, as if isolation.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 4, value: 101},
	{ actor: "neighboursDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 3},
]},
{ leadingBlank: 0, duration: 7, text: `Conway's Game of Life, a zero-player game, emerged as a remarkable creation from mathematics and computer science.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 8, value: 50},
  { actor: "camera", actionType: "move", duration: 7, absolutePosition: [20, 30, 0],},
]},
{ leadingBlank: 1, duration: 5, text: `It was invented in 1970 by the renowned British mathematician John Horton Conway.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 6, value: 80},
  { actor: "camera", actionType: "move", duration: 5, absolutePosition: [20, 30, -10],},
]},

{ leadingBlank: 1, duration: 5, text: `Distinct steps mark the progression of time in this game. With each passing step, a cell's state transforms, influenced by the states of its eight neighbors.`, actions: []},
{ leadingBlank: 1, duration: 5, text: `Here are the rules:`, actions: []},
{ leadingBlank: 1, duration: 5, text: `A cell springs into life if it is surrounded by exactly three living neighbors - a simulation of reproduction.`, actions: []},
{ leadingBlank: 1, duration: 5, text: `A living cell maintains its life if it has two or three living neighbors.`, actions: []},
{ leadingBlank: 1, duration: 5, text: `But in all other circumstances, a cell either remains dead or dies - as if from isolation or overcrowding.`, actions: []},
{ leadingBlank: 1, duration: 5, text: `Despite its simple rules, Conway's Game of Life is far from straightforward, and it exemplifies emergence and self-organization.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 10, value: 100},
]},
{ leadingBlank: 1, duration: 5, text: `Complex behaviors arise from these simple rules, underscoring the game's intriguing nature.`, actions: []},
{ leadingBlank: 1, duration: 5, text: `The Game of Life has found applications in various scientific and mathematical research due to its unique properties.`, actions: []},
{ leadingBlank: 1, duration: 5, text: `And beyond its academic allure, it's simply fun to watch as the game's 'life' unfolds!`, actions: []},

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
const gliders: Cell[] = generateRandomCells(2000, 0.3, 30000);

export const StoryGameOfLife: React.FC = () => {
  return (
		<Story id="StoryGameOfLife" width={720} height={720} subtitles={transparentSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame cameraDistance={0} lookAtY={0} lookAtZ={0} cameraY={0} cameraZ={0}>
				{/* <ambientLight intensity={0.5} /> */}
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<GameOfLifeAnimated actor="gol" startLives={gliders} />
			</ThreeDFrame>
		</AbsoluteFill>
			<AnimationEffect actor="subtitles">
				<Subtitles scale={1} language="zhCN"/>
			</AnimationEffect>
		</Story>
  );
};
