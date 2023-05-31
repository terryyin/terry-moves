import React, { useEffect } from 'react';
import { UnderCamera } from '../UnderCamera';
import { useThree } from '@react-three/fiber';
import { AxesHelper, CameraHelper } from 'three';

export const ThreeDFrameInner: React.FC<{
	cameraY?: number,
	cameraZ?: number,
	lookAtY?: number,
	lookAtZ?: number,
	debug?: boolean,
  children: React.ReactNode;
}> = ({cameraY, cameraZ, lookAtY, lookAtZ, debug, children}) => {
	const { scene, camera } = useThree();

  useEffect(() => {
			if(debug) {
				const axesHelper = new AxesHelper(5); 
				const cameraHelper = new CameraHelper(camera);

				scene.add(axesHelper);
				scene.add(cameraHelper);
		}
  }, [scene, camera, debug]);
	

	return (
		<>
			<ambientLight intensity={1.5} color={0xffffff} />
			<pointLight position={[10, 10, 0]} />
			<UnderCamera cameraY={cameraY} cameraZ={cameraZ} lookAtY={lookAtY} lookAtZ={lookAtZ}>
				{children}
			</UnderCamera>
		</>
	);
};
