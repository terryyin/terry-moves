import React  from 'react';
import { Cell } from './gameOfLife';

export const GameOfLife3D: React.FC<{lives: Cell[]}>  = ({lives}) => {
	const gridSize = 1;
	const ballRadius = gridSize / 3;
	return <group>
				<gridHelper args={[200, 200]} position={[gridSize / 2, 0, gridSize / 2]} />
				{lives.map((life, idx) => (
					<mesh key={idx} position={[life.x, ballRadius, life.y]}>
						<sphereGeometry args={[ballRadius, 32, 32]} />
						<meshPhysicalMaterial color={0x00ff00} />
					</mesh>
				))}
			</group>
};
