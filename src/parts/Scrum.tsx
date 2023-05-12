import React  from 'react';

import * as THREE from 'three';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { ThreeDArrow } from '../video_components/ThreeDArrow';
import { GroupInitialState } from '../video_components/GroupInitialState';


// eslint-disable-next-line max-params
function generateSpiralCirclePoints(
  circleRadius: number,
  zIncrement: number,
  numberOfPoints: number,
  numberOfTurns: number,
  bending: number,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];

  const startAngle = bending / 1.5;
  const trueNumberOfTurns = numberOfTurns - startAngle * numberOfTurns / Math.PI ;

  for (let i = 0; i <= numberOfPoints; i++) {
    const angle = ((2 * Math.PI + startAngle) * trueNumberOfTurns * i ) / numberOfPoints;
    const x = circleRadius * Math.sin(angle);
    const y = -circleRadius * Math.cos(angle) + bending;
    const z = (zIncrement * i) / numberOfPoints;

    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
}

export const Scrum: React.FC<{actor: string, headActor: string, bendingActor: string}> = ({actor, headActor, bendingActor}) => {
  const headMove = useAnimationContext().getGeneralValue(headActor) ?? 0;
  const trueBending = useAnimationContext().getGeneralValue(bendingActor) ?? 0;

  const radius = 1;
  const spiralCirclePoints = generateSpiralCirclePoints(
    radius,
    1,
    100,
    1,
    trueBending
  );


  const oneSprint = [new THREE.Vector3(-2.4, -radius, -1), ...spiralCirclePoints, new THREE.Vector3(1, -radius, 1.2), new THREE.Vector3(2, -radius + headMove, 1.4)]

  const daily = generateSpiralCirclePoints(
    0.3,
    0,
    100,
    1,
    1.5
  );


  return (
    <>
    <ThreeDArrow actor={actor} tubeRadius={0.2} color={new THREE.Color(0x59788e)} points={oneSprint}/>
    <GroupInitialState position={[1, 0 + trueBending, 0]} rotation={[0, 0, 0]} scale={1}>
      <ThreeDArrow actor={actor} tubeRadius={0.1} color={new THREE.Color(0xed7117)} points={daily}/>
    </GroupInitialState>
    </>
  );
};
