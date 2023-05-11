import React  from 'react';

import * as THREE from 'three';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { ThreeDArrowInner } from './private/ThreeDArrowInner';

export const ThreeDArrow: React.FC<{actor: string, points: THREE.Vector3[], color?: THREE.Color}> = ({actor, points, color}) => {
  const percentage = useAnimationContext().getGeneralValue(actor) ?? 0;

  return <ThreeDArrowInner points={points} color={color ?? new THREE.Color(0x000000)} percentage={percentage} />
};
