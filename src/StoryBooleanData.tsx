
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
import { WindBlow } from './parts/WindBlow';
import { CodeHighlight } from './video_components/CodeHighlight';
import { CSSProperties } from 'react';

export const booleanDataSubtitles: Subtitle[] = [

{ leadingBlank: 0, duration: 4, text: `Welcome to the third and final part of our 'Oh My Bad Boolean' series! `, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 0, value: 90},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0, value: 0},
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0, value: 0},
  { actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 20, -40],},
  { actor: "camera", actionType: "camera look at", duration: 0, absolutePosition: [0, 0, -30],},
]},
{ leadingBlank: 1, duration: 5, text: `After bad boolean parameters and return values, let's see 'Why Do I Need To Reconsider My Boolean Data?'`, actions: [
		{ actor: "second title", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 1, text: "Keep it simple, but not simpler", startDuration: 1, endDuration: 1 },
]},
{ leadingBlank: 1, duration: 3, text: `Let's start with our first example.`, actions: [
	{ actor: "title", actionType: "disappear", startDuration: 1, offset: 0 },
]},

{ leadingBlank: 0, duration: 4, text: `Imagine an infinite, two-dimensional grid of square cells,`, actions: [
  { actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0.7, 0, -0.6], offset: 1},
	{ actor: "gol", actionType: "additive value change to", duration: 4, value: 100},
  { actor: "camera", actionType: "move", duration: 2, absolutePosition: [-1, 2, -0.4], offset: 3},
]},

{ leadingBlank: 1, duration: 3, text: `that are either dead or alive.`, actions: [
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 2},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 2},
]},
{ leadingBlank: 1, duration: 4, text: `Surrounding every cell are eight neighbors.`, actions: [
	{ actor: "neighboursDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 4},
]},

{ leadingBlank: 1, duration: 5, text: `An living cell will die if it has one or no alive neighour, as if in isolation.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 3, value: 100.8},
	{ actor: "wind", actionType: "additive value change to", duration: 1, value: 1, offset: 2},
	{ actor: "neighboursDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 5},
]},

{ leadingBlank: 1, duration: 4, text: `It will survive if there are two or three neighbours.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 5, value: 103},
	{ actor: "neighboursDemoSurvive", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
]},

{ leadingBlank: 1, duration: 5, text: `It will die if there are four or more neighbours, as if overcrowding.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 3, value: 103.8, offset: 1},
]},

{ leadingBlank: 1, duration: 5, text: `A dead cell with exactly 3 alive neighbours will come to life, as if reproduction.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 0.5, value: 104.2, offset: 0},
	{ actor: "neighboursDemoSurvive", actionType: "additive value change to", duration: 0.5, value: 0, offset: 5},
	{ actor: "gol", actionType: "additive value change to", duration: 2, value: 105, offset: 2},
]},

{ leadingBlank: 1, duration: 5, text: `From these simple rules, a complex dance of life and death unfolds.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 5, value: 108},
]},

{ leadingBlank: 0, duration: 5, text: `This is the Conway's Game of Life.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 0, value: 0},
	{ actor: "gol", actionType: "additive value change to", duration: 20, value: 200},
  { actor: "camera", actionType: "move", duration: 7, absolutePosition: [20, 30, 0],},
]},

{ leadingBlank: 1, duration: 6, text: `It is also a popular programming exercise, to calculate the next step of a given state.`, actions: [
  { actor: "camera", actionType: "move", duration: 5, absolutePosition: [20, 30, -10],},
]},
{ leadingBlank: 1, duration: 4, text: `My first thought was, 'Why not use a 2D array of Booleans?'`, actions: [
]},
{ leadingBlank: 1, duration: 4, text: `'Alive cells are true, dead ones are false. Simple.'`, actions: [
	{ actor: "mask", actionType: "appear", startDuration: 0.2, persistUntilSubtitleId: "2nd example"},
]},
{ leadingBlank: 1, duration: 5, text: `To further simplify, I began with a smaller world, a 3x3 cell grid.`, actions: [
]},
{ leadingBlank: 1, duration: 5, text: `But this is where I stumbled into the trap of 'illusory simplicity.'`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `This approach, which seemed to simplify the task, actually introduced non-intrinsic complexity by forcing me to deal with boundary cases.`, actions: [
]},
{ leadingBlank: 1, duration: 5, text: `What initially appeared more manageable was, in reality, far more complex.`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `However, a more elegant solution exists: simply track the coordinates of living cells.`, actions: [
]},
{ leadingBlank: 1, duration: 3, text: `This strategy bypasses the boundary problem, `, actions: [
]},
{ leadingBlank: 1, duration: 4, text: `and if needed, boundaries can be added later as an additional constraint.`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `This brings us back to a critical design principle, 'Einstein's Razor.' This heuristic, akin to Occam's Razor,`, actions: [
]},
{ leadingBlank: 1, duration: 5, text: `reminds us to 'Make everything as simple as possible, but not simpler.' `, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `It cautions us that oversimplification can lead to misinformation or undesirable outcomes.`, actions: [
]},
{ id: "2nd example", leadingBlank: 2, duration: 4, text: `Moving on to our second example.`, actions: [
	{ actor: "game of life", actionType: "disappear", startDuration: 0.2},
]},
{ leadingBlank: 1, duration: 5, text: `In a course management system, courses can be public and have some price information.`, actions: [
]},
{ leadingBlank: 1, duration: 4, text: `But when a course is private, the price becomes meaningless.`, actions: [
]},
{ leadingBlank: 1, duration: 5, text: `This inconsistency violates the Principle of Least Astonishment`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `A potential solution would be to group related data together, making it optional. `, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `In our specific business domain, a private course and a course with no price info are considered the same concept.`, actions: [
]},
{ leadingBlank: 1, duration: 4, text: `Therefore, we could bundle price information and make it optional. `, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `That way, a private course simply doesn't have this information, eliminating any ambiguity.`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `However, it's crucial to remember that solutions depend heavily on the business domain.`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `So, to wrap things up, Boolean data, being the simplest data type, can sometimes be too simple. `, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `When it can't effectively represent the problem, other complexities creep in. `, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `Remember the Principle of Least Astonishment and Avoid Premature Abstraction when designing your data structures.`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `Think carefully about your Boolean data - it might not be as straightforward as it seems!`, actions: [
]},
{ leadingBlank: 1, duration: 10, text: `Thanks for watching! There is so much I want to share about boolean still. Maybe in the future. I'd like to talk about the art of copy-paste next. Stay tuned.`, actions: [
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
const gliders: Cell[] = generateRandomCells(2000, 0.3, 30000);

const announceBoardStyle: CSSProperties = { 
				paddingTop: '20px',
				paddingLeft: '10px',
	fontFamily: 'Roboto, sans-serif', left: '0%', top: '35%', width: '100%', height: '45%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }


export const StoryBooleanData: React.FC = () => {
  return (
		<Story id="StoryBooleanData" width={720} height={720} subtitles={booleanDataSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "black"}}>
    <AnimationEffect actor="game of life">
			<ThreeDFrame cameraDistance={0} lookAtY={0} lookAtZ={0} cameraY={0} cameraZ={0}>
				{/* <ambientLight intensity={0.5} /> */}
				<directionalLight castShadow position={[10, 20, 15]} intensity={5} color={0xffffff} />	
				<GameOfLifeAnimated actor="gol" startLives={gliders} />
			</ThreeDFrame>
		</AnimationEffect>
		<WindBlow actor="wind" style={{left: "35%", width: "20%", top: "18%"}} />
    <AnimationEffect actor="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}/>

    <AnimationEffect actor="title" style={announceBoardStyle} >
			<span style={{
				display: 'block',
				paddingTop: '30px',
      fontSize: '36px',
			color: 'white',
      fontWeight: 'bold',
			fontFamily: 'Roboto, sans-serif',
    }}>Why Do I Have To Reconsider My Boolean Data?</span>

			<CodeHighlight actor="second title" style={{
				position: 'relative',
				paddingTop: '35px',
				display: 'block',
      fontSize: '30px',
			color: 'white',
			fontFamily: 'IBM Plex Mono',
    }} language="html" codeString=""/>
		</AnimationEffect>
		</AbsoluteFill>

			<AnimationEffect actor="subtitles">
				<Subtitles scale={1} language="zhCN"/>
			</AnimationEffect>
		</Story>
  );
};
