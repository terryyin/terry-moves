import React, { useEffect } from 'react';
import { UnderCamera } from '../UnderCamera';
import { useThree } from '@react-three/fiber';
import { AxesHelper, CameraHelper } from 'three';

export const ThreeDFrameInner: React.FC<{
	debug?: boolean,
  children: React.ReactNode;
}> = ({debug, children}) => {
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
			<UnderCamera>
				{children}
			</UnderCamera>
		</>
	);
};
