import {useRef} from 'react'
import React  from 'react';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAnimationContext } from '../hooks/useAnimationContext';

// eslint-disable-next-line max-params
function createPartialTubeGeometry(curve: THREE.CatmullRomCurve3, percentage: number, radialSegments = 8, tubularSegments = 50, radius = 0.1) {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];
  const normals = [];
  const uvs = [];

  const segmentPercentage = Math.max(Math.min(percentage, 1), 0);
  const segmentCount = Math.round(tubularSegments * segmentPercentage);

  for (let i = 0; i <= segmentCount; i++) {
    const u = i / tubularSegments;
    const p1 = curve.getPointAt(u);
    const p2 = curve.getTangentAt(u).normalize().cross(new THREE.Vector3(0, 1, 0)).multiplyScalar(radius);

    for (let j = 0; j <= radialSegments; j++) {
      const v = j / radialSegments;
      const vertex = p1.clone().add(p2.clone().applyAxisAngle(curve.getTangentAt(u), (v * Math.PI * 2)));
      vertices.push(vertex.x, vertex.y, vertex.z);
      normals.push(p2.x, p2.y, p2.z);
      uvs.push(i / tubularSegments, j / radialSegments);
    }
  }

  for (let i = 0; i < segmentCount; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = a + radialSegments + 1;
      indices.push(a, b, a + 1);
      indices.push(b, b + 1, a + 1);
    }
  }

  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  return geometry;
}


export const ThreeDArrow: React.FC<{actor: string, points: THREE.Vector3[]}> = ({actor, points}) => {
  const percentage = useAnimationContext().getGeneralValue(actor) ?? 0;

  // Create a curved line
  const curve = new THREE.CatmullRomCurve3(points);
  const tubeRadius = 0.1;
  // Const tubeGeometry = new THREE.TubeGeometry(curve, 50, tubeRadius, 8, false);
	const tubeGeometry = createPartialTubeGeometry(curve, percentage, 8, 50, tubeRadius);

  const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });


  // Calculate arrow properties
  const arrowLength = 0.4;
  const arrowColor = new THREE.Color(0x000000);

  // Create arrowhead geometry (cone)
  const arrowHeadRadius = tubeRadius * 2;
  const arrowHeadHeight = arrowLength;
  const arrowHeadGeometry = new THREE.ConeGeometry(arrowHeadRadius, arrowHeadHeight, 32);

  // Calculate arrowhead position and orientation
  const arrowHead = useRef<THREE.Mesh>(null);
	const mesh = useRef<THREE.Mesh>(null);

	useFrame(() => {
    if (mesh.current) {
			const newGeometry = createPartialTubeGeometry(curve, percentage, 8, 50, 0.1);
			mesh.current.geometry.dispose();
			mesh.current.geometry = newGeometry;

			// Update arrowhead position and direction
			if (arrowHead.current) {
				const arrowPosition = curve.getPointAt(percentage);
				const arrowDirection = curve.getTangentAt(percentage);

				arrowHead.current.position.copy(arrowPosition);
				arrowHead.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), arrowDirection.clone().normalize());
			}
		}
  });
	
  return (
		<>
		<mesh ref={mesh} geometry={tubeGeometry} material={tubeMaterial} />
			(percentage !== 0 && <mesh
        ref={arrowHead}
        geometry={arrowHeadGeometry}
        material={new THREE.MeshBasicMaterial({ color: arrowColor })}
      />)

		</>
  );
};
