import {interpolate} from 'remotion'
import React  from 'react';
import { Cell, GameOfLifeWorld } from './gameOfLife';
import { Fog } from 'three/src/scenes/Fog';
import { useThree } from '@react-three/fiber';
import { CellPane } from './CellPane';
import * as THREE from 'three';
import { interpolateColors } from 'remotion';

export interface HighlightedCell {
	cell: Cell;
	color: THREE.Color;
	progress: number;
}

const gridSize = 1;
const ballRadius = gridSize / 3;

function getColor(neighbourCount: number, progress: number) {
	const startColor = "#00ff00"
	if (neighbourCount === 1) {
		return interpolateColors(progress, [0, 1],  [startColor, "#00ffff"]);
	} 
 if (neighbourCount === 3) {
		return new THREE.Color(0x0000ff);
	}
	return new THREE.Color(0x00ff00);
}

function getRadius(neighbourCount: number, progress: number) {
	if (neighbourCount === 1) {
		return interpolate(progress, [0.6, 1],  [ballRadius, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
	} 
	return ballRadius;
}

export const GameOfLife3D: React.FC<{lives: Set<Cell>, world: GameOfLifeWorld, highightCells: HighlightedCell[], progress: number}>  = ({lives, world, highightCells, progress}) => {
	const { scene } = useThree();
	
	React.useEffect(() => {
		scene.fog = new Fog('beige', 0, 100);
	}, [scene]);

	return <group>
				<gridHelper args={[500, 500]} position={[gridSize / 2, 0, gridSize / 2]} />
				{highightCells.map(({cell, progress, color}, idx) => (
					<CellPane key={idx} cellToHighlight={cell} progress={progress} color={color} />
				))}
				{[...lives].map((life, idx) => {
					const neighbourCount = world.getAliveNeighbourCount(lives, life);
					const color = getColor(neighbourCount, progress);
					const radius = getRadius(neighbourCount, progress);
					return <mesh key={idx} position={[life.x, radius, life.y]}>
						<sphereGeometry args={[radius, 32, 32]} />
						<meshPhysicalMaterial color={color} emissive="#00ff00" emissiveIntensity={0.2} />
					</mesh>
				})}
			</group>
};
