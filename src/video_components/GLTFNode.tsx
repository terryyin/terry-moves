import { Clone } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const GLTFNode: React.FC<{
  nodeName: string,
  url: string,
}> = ({ nodeName, url }) => {
  const gltf = useLoader(GLTFLoader, url);
  const [node, setNode] = useState<Group | null>(null);

  const meshRef = useRef<Group>(null);

  useEffect(() => {
    if (gltf) {
      const foundNode = gltf.scene.getObjectByName(nodeName);
      if (foundNode) {
        setNode(foundNode as THREE.Group);
      }
    }
  }, [gltf, nodeName, url]); // Added url to the dependencies array

  return (
    <group ref={meshRef}>
      {node && <Clone object={node} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} />}
    </group>
  );
};
