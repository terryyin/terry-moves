import {Euler } from '@react-three/fiber';
import React  from 'react';
import { useAnimationContext } from '../hooks/useAnimationContext';

export const ThreeAnimationEffect: React.FC<{
	actor: string,
  children: React.ReactNode;
}> = ({actor, children, }) => {

	const animationContextWrapper = useAnimationContext();
	const { scale, position, rotation } = animationContextWrapper.get3DObjectStateOf(actor);


	return (
		<group
			scale={scale}
			rotation={ rotation.toArray() as Euler }
			position={ position.toArray() }
		>
			{children}
		</group>
	);
};
