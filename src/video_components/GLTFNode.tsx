import { Clone } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { Box3, Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const GLTFNode: React.FC<{
  nodeName: string,
  url: string,
  recenter?: boolean,
}> = ({ nodeName, recenter, url }) => {
  const gltf = useLoader(GLTFLoader, url);
  const [node, setNode] = useState<Group | null>(null);

  const meshRef = useRef<Group>(null);

  useEffect(() => {
    if (gltf) {
      const foundNode = gltf.scene.getObjectByName(nodeName);
      if (foundNode) {
        const box = new Box3().setFromObject(foundNode);
        if(recenter) {
          const center = box.getCenter(new Vector3()).negate();

          foundNode.position.set(center.x, center.y, center.z);
          foundNode.updateMatrixWorld();
        }
        setNode(foundNode as THREE.Group);
      }
    }
  }, [gltf, nodeName, recenter, url]);

  return (
    <group ref={meshRef}>
      {node && <Clone object={node} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} />}
    </group>
  );
};
