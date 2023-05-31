import { useLoader } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const GLTFNode: React.FC<{
  nodeName: string,
  scale?: number,
  url: string,
}> = ({ nodeName, scale, url }) => {
  const gltf = useLoader(GLTFLoader, url);
  const [node, setNode] = useState<Group | null>(null);

  useEffect(() => {
    if (gltf) {
      const foundNode = gltf.scene.getObjectByName(nodeName);
      if (foundNode) {
        setNode(foundNode as THREE.Group);
      }
    }
  }, [gltf, nodeName]);

  return (
    <group scale={scale}>
      {node && <primitive object={node} />}
    </group>
  );
};
