import React  from 'react';

import * as THREE from 'three';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { ThreeDArrow } from '../video_components/ThreeDArrow';


function generateSpiralCirclePoints(
  circleRadius: number,
  zIncrement: number,
  numberOfPoints: number,
  numberOfTurns: number
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= numberOfPoints; i++) {
    const angle = (2 * Math.PI * numberOfTurns * i) / numberOfPoints;
    const x = circleRadius * Math.sin(angle);
    const y = -circleRadius * Math.cos(angle);
    const z = (zIncrement * i) / numberOfPoints;

    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
}

export const Scrum: React.FC<{actor: string, headActor: string}> = ({actor, headActor}) => {
  const headMove = useAnimationContext().getGeneralValue(headActor) ?? 0;

  const radius = 1;
  const spiralCirclePoints = generateSpiralCirclePoints(
    radius,
    1,
    100,
    1
  );


  const oneSprint = [new THREE.Vector3(-2.4, -radius, -1), ...spiralCirclePoints, new THREE.Vector3(1, -radius, 1.2), new THREE.Vector3(2, -radius + headMove, 1.4)]
  return (
    <ThreeDArrow actor={actor} tubeRadius={0.2} color={new THREE.Color(0x850000)} points={oneSprint}/>
  );
};
