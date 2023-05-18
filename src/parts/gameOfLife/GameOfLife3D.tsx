import React  from 'react';
import { Cell, GameOfLifeWorld } from './gameOfLife';
import { Fog } from 'three/src/scenes/Fog';
import { useThree } from '@react-three/fiber';
import { CellPane } from './CellPane';
import * as THREE from 'three';

export interface HighlightedCell {
	cell: Cell;
	color: THREE.Color;
	progress: number;
}

export const GameOfLife3D: React.FC<{lives: Set<Cell>, world: GameOfLifeWorld, highightCells: HighlightedCell[]}>  = ({lives, world, highightCells}) => {
	const { scene } = useThree();
	const gridSize = 1;
	const ballRadius = gridSize / 3;
	
	React.useEffect(() => {
		scene.fog = new Fog('beige', 0, 100);
	}, [scene]);
	return <group>
				<gridHelper args={[500, 500]} position={[gridSize / 2, 0, gridSize / 2]} />
				{highightCells.map(({cell, progress, color}, idx) => (
					<CellPane key={idx} cellToHighlight={cell} progress={progress} color={color} />
				))}
				{[...lives].map((life, idx) => (
					<mesh key={idx} position={[life.x, ballRadius, life.y]}>
						<sphereGeometry args={[ballRadius, 32, 32]} />
						<meshPhysicalMaterial color={0xff0000} emissive="#00ff00" emissiveIntensity={0.2} />
					</mesh>
				))}
			</group>
};
