
import {Img} from 'remotion'
import {random, staticFile} from 'remotion'
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
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';
import { GroupInitialState } from './video_components/GroupInitialState';
import { ThinkingEmoji } from './parts/ThinkingEmoji';
import { CalloutCloud } from './video_components/CalloutCloud';
import { Markdown } from './video_components/Markdown';

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
	{ actor: "gol", actionType: "additive value change to", duration: 20, value: 200},
  { actor: "camera", actionType: "move", duration: 5, absolutePosition: [20, 30, 0],},
]},

{ leadingBlank: 1, duration: 6, text: `It is also a popular programming exercise, to calculate the next step of a given state.`, actions: [
  { actor: "camera", actionType: "move", duration: 5, absolutePosition: [20, 30, -10],},
]},
{ leadingBlank: 1, duration: 4, text: `My first thought was, 'Why not use a 2D array of Booleans?'`, actions: [
	{ actor: "array", actionType: "appear", startDuration: 1},
	{ actor: "array", actionType: "3d rotate", endingTimeAdjustment: 0, totalRotation: [40, 0, -65], offset: 0},
]},
{ leadingBlank: 1, duration: 4, text: `'Alive cells are true, dead ones are false. Simple.'`, actions: [
	{ actor: "array", actionType: "3d rotate", endingTimeAdjustment: 2, totalRotation: [0, 0, 0], offset: 0},
	{ actor: "mask", actionType: "appear", startDuration: 0.2, persistUntilSubtitleId: "2nd example"},
]},
{ leadingBlank: 1, duration: 5, text: `To further simplify, I began with a smaller world, a 3x3 cell grid.`, actions: [
	{ actor: "array", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 2, count: 11, offset: 1},
	{ actor: "array", actionType: "insert text", endingTimeAdjustment: 1, line: 1, column: 2, text: `
  [ false, true, false ],
  [ false, true, false ],
  [ true, true, false ]`, startDuration: 1, endDuration: 0 },

]},
{ leadingBlank: 1, duration: 5, text: `But this is where I stumbled into the trap of 'illusory simplicity.'`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `This approach, which seemed to simplify the task, actually introduced non-intrinsic complexity by forcing me to deal with boundary cases.`, actions: [
			  { actor: "thinker", actionType: "rotate and rise", duration: 2, value: 3, offset: 0 },
	{ actor: "boundary callout", actionType: "appear", startDuration: 1, endingTimeAdjustment: 4, endDuration: 0, offset: 2},
]},
{ leadingBlank: 1, duration: 6, text: `However, a more elegant solution exists: simply track the coordinates of living cells.`, actions: [
			  { actor: "thinker", actionType: "disappear", startDuration: 1 },
				{ actor: "positions", actionType: "appear", startDuration: 1},
]},
{ leadingBlank: 1, duration: 3, text: `This strategy bypasses the boundary problem, `, actions: [
	{ actor: "positions", actionType: "insert text", endingTimeAdjustment: 2, line: 5, column: 20, text: `
  {x: -2, y: -3},
  {x: -200, y: 999999},`, startDuration: 1, endDuration: 0 },
]},
{ leadingBlank: 1, duration: 4, text: `and if needed, boundaries can be added later as an additional constraint.`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `This brings us back to a critical design principle, 'Einstein's Razor.' This heuristic, akin to Occam's Razor,`, actions: [
	{ actor: "einstein's razor", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "oversimple"},
	{ actor: "einstein quote", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 1, text: 
	`"Make everything as simple as possible,
but not simpler."

  -- Einstein's Razor`, startDuration: 1, endDuration: 1 },
]},
{ leadingBlank: 1, duration: 5, text: `reminds us to 'Make everything as simple as possible, but not simpler.' `, actions: [
]},
{ id: "oversimple", leadingBlank: 1, duration: 6, text: `In this case using boolean might be a oversimplification and introduce more complexity.`, actions: [
]},
{ id: "2nd example", leadingBlank: 2, duration: 4, text: `Moving on to our second example.`, actions: [
	{ actor: "game of life", actionType: "disappear", startDuration: 0.2},
]},
{ leadingBlank: 1, duration: 5, text: `In a course management system, courses can be public and have some price information.`, actions: [
	{ actor: "public course", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "summary"},
	{ actor: "public course", actionType: "highlight lines", endingTimeAdjustment: 2, lines: [3], offset: 1},
	{ actor: "public course", actionType: "highlight lines", endingTimeAdjustment: 2, lines: [4, 5, 6], offset: 3},
]},
{ leadingBlank: 1, duration: 4, text: `But when a course is private, the price becomes meaningless.`, actions: [
	{ actor: "private course", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "summary"},
	{ actor: "private course", actionType: "highlight lines", endingTimeAdjustment: 2, lines: [3], offset: 2},
]},
{ leadingBlank: 1, duration: 5, text: `This inconsistency violates the Principle of Least Astonishment`, actions: [
	{ actor: "confused course", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "summary"},
	{ actor: "confused course", actionType: "highlight lines", endingTimeAdjustment: 4, lines: [3], offset: 1},
	{ actor: "confused course", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [4], offset: 2, style: 'wavy underline'},
]},
{ leadingBlank: 1, duration: 6, text: `Whether 'isPrivate' represents a solid business concept depend heavily on the business domain.`, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `But in this example we can see that additional complexity will be necessary to keep the consistency.`, actions: [
]},
{id: "summary", leadingBlank: 1, duration: 6, text: `So, to wrap things up, Boolean data, being the simplest data type, can sometimes be too simple. `, actions: [
	{ actor: "mask", actionType: "appear", startDuration: 0.5 },
	{ actor: "conclusion", actionType: "appear", startDuration: 1 },
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
	fontFamily: 'Poppins', left: '0%', top: '35%', width: '100%', height: '45%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }


	const bigArray = `[
  [false, false, true, true, false, false, true, false],
  [true, false, false, false, true, false, false, false],
  [true, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, true, false, false],
  [false, true, false, false, true, false, false, false],
  [false, true, false, false, false, false, true, false],
  [false, false, false, false, false, false, false, false],
  [false, false, true, false, true, false, false, false],
  [false, false, true, false, false, false, false, false],
  [false, true, false, false, true, false, false, false],
]`

const listOfPos = `[
  {x: 1, y: 0},
  {x: 1, y: 1},
  {x: 0, y: 2},
  {x: 1, y: 2},
]`

const publicCourse = `publicCourse = {
  name: "Boolean Master",
  isPrivate: false,
  price: Money(100, "USD"),
  earlyBirdPrice: Money(80, "USD"),
  earlyBirdDeadline: Date("2020-01-01"),
}`

const privateCourse = `privateCourse = {
  name: "Boolean Deep Dive",
  sPrivate: true,
}`

const confusedCourse = `confusedCourse = {
  name: "Three States of Boolean",
  isPrivate: true,
  price: Money(100, "USD"),
}`

const conclusion = `## Conclusion

* Boolean data is the simplest data type, but it can be too simple.
* Remember Einstein's quote:
  * "Make things as simple as possible, but not simpler."
* Remember the Principle of Least Astonishment and make mistakes impresentable.
`;

export const StoryBooleanData: React.FC = () => {
  return (
		<Story id="StoryBooleanData" width={720} height={720} subtitles={booleanDataSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "black", perspective: "400px"}}>
    <AnimationEffect actor="game of life" style={{transformStyle: "preserve-3d"}}>
			<ThreeDFrame cameraDistance={0} lookAtY={0} lookAtZ={0} cameraY={0} cameraZ={0}>
				{/* <ambientLight intensity={0.5} /> */}
				<directionalLight castShadow position={[10, 20, 15]} intensity={5} color={0xffffff} />	
				<GameOfLifeAnimated actor="gol" startLives={gliders} />
			</ThreeDFrame>
			<WindBlow actor="wind" style={{left: "35%", width: "20%", top: "18%"}} />
			<AnimationEffect actor="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}/>
			<CodeHighlight actor="array" codeString={bigArray} style={{ left: '2%', top: '25%', width: '60%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}} />
			<CodeHighlight actor="positions" codeString={listOfPos} style={{ left: '55%', top: '25%', width: '60%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}} />

			<AnimationEffect actor="einstein's razor" style={{backgroundColor: "rgba(0,0,0, 0.8)", width: "100%", height: "100%"}}>
				<Img src={staticFile("assets/Einstein_1921.jpg")} style={{position: "absolute", width: "100%"}}/>
				<CodeHighlight actor="einstein quote" codeString="" style={{ left: '10%', top: '60%', width: '40%', height: '60%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible'}} preStyle={{backgroundColor: "rgba(0,0,0,0.1)"}} />
			</AnimationEffect>

		</AnimationEffect>
		</AbsoluteFill>
		<CalloutCloud actor='boundary callout' style={{top: '45%', left: "2%"}} tailShift={5} tailHeightPx={50}>
			<span style={{ fontSize: '30px', margin: 0 }} > 🤔 How many neighbours does (0, 0) have? (2, 2)? 🤔 </span>
		</CalloutCloud>

		<CodeHighlight actor="public course" codeString={publicCourse} style={{ left: '10%', top: '10%', width: '80%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(100,100,100,0.7)"}} />
		<CodeHighlight actor="private course" codeString={privateCourse} style={{ left: '10%', top: '40%', width: '80%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(100,100,100,0.7)"}} />
		<CodeHighlight actor="confused course" codeString={confusedCourse} style={{ left: '10%', top: '60%', width: '80%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(100,100,100,0.7)"}} />

		<AnimationEffect actor="title" style={announceBoardStyle} >
			<span style={{
				display: 'block',
				paddingTop: '30px',
			fontSize: '36px',
			color: 'white',
			fontWeight: 'bold',
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

    <Markdown actor="conclusion" style={{...announceBoardStyle, top: "15%", height: "60%", paddingTop: "20p", fontFamily: "Poppins", fontSize: "x-large"}}
			md={conclusion}
		 />


		<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
			<ThreeDFrame cameraDistance={8} lookAtY={0} cameraY={0}>
				<directionalLight castShadow position={[10, 20, 15]} intensity={15} color={0xffffff} />	
				<ThreeAnimationEffect actor="thinker">
					<GroupInitialState rotation={[-0.8, -0, 0.9]} position={[10, -0.5, -6]} scale={4}>
					<ThinkingEmoji/>
					</GroupInitialState>
				</ThreeAnimationEffect>
			</ThreeDFrame>
		</AbsoluteFill>
			<AnimationEffect actor="subtitles">
				<Subtitles scale={1} language="zhCN"/>
			</AnimationEffect>
		</Story>
  );
};
