import create from '@react-three/test-renderer';
import { ThreeDArrowInner } from '@/video_components/private/ThreeDArrowInner';
import * as THREE from 'three';


it('renders ThreeDArrowInner correctly', async () => {
  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -3),
    new THREE.Vector3(0, -3, -6),
  ];

  const color = new THREE.Color('#ff0000');
  const emissive = new THREE.Color('#aa0000');
  const tubeRadius = 0.1;

  const component = await create.create(
    <ThreeDArrowInner
      percentage={0.5}
      points={points}
      color={color}
      emissive={emissive}
      tubeRadius={tubeRadius}
    />
  );

  const {scene} = component;

  const meshes = scene.findAll((el) => el.type === 'Mesh');
  expect(meshes.length).toBe(2); // One for the tube and one for the arrowhead

  const tubeMesh = meshes[0];
  const tubeMaterial = tubeMesh.props.material;
  expect(tubeMaterial.color).toEqual(color);
  expect(tubeMaterial.emissive).toEqual(emissive);

  const arrowHeadMesh = meshes[1];
  const arrowHeadMaterial = arrowHeadMesh.props.material;
  expect(arrowHeadMaterial.color).toEqual(color);
  expect(arrowHeadMaterial.emissive).toEqual(emissive);
});
