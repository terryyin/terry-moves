import React  from 'react';
import { Cell, GameOfLifeWorld } from './gameOfLife';
import { Fog } from 'three/src/scenes/Fog';
import { useThree } from '@react-three/fiber';

export const GameOfLife3D: React.FC<{lives: Set<Cell>, world: GameOfLifeWorld}>  = ({lives, world}) => {
	const { scene } = useThree();
	const gridSize = 1;
	const ballRadius = gridSize / 3;
	
	React.useEffect(() => {
		scene.fog = new Fog('beige', 0, 100);
	}, [scene]);
	return <group>
				<gridHelper args={[500, 500]} position={[gridSize / 2, 0, gridSize / 2]} />
				{[...lives].map((life, idx) => (
					<mesh key={idx} position={[life.x, ballRadius, life.y]}>
						<sphereGeometry args={[ballRadius, 32, 32]} />
						<meshPhysicalMaterial color={0xff0000} emissive="#00ff00" emissiveIntensity={0.2} />
					</mesh>
				))}
			</group>
};
