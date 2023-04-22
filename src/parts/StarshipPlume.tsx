import React from 'react';
import { RocketPlume } from './RocketPlume';

export const StarshipPlume: React.FC<{
	aspectRatio: number;
	baseScale: number;
}> = ({aspectRatio, baseScale}) => {

  return (
		  <group>
			<RocketPlume position={[-1.5, 0, 0]} scale={1} />
			<RocketPlume position={[-1, 0, 0]} scale={1.4} />
			<RocketPlume position={[-0.5, 0, 0]} scale={1.6} />
			<RocketPlume position={[0, 0, 0]} scale={2} />
			<RocketPlume position={[0.5, 0, 0]} scale={1.6} />
			<RocketPlume position={[1, 0, 0]} scale={1.4} />
			<RocketPlume position={[1.5, 0, 0]} scale={1} />
		</group>
  );
};
