import {Composition} from 'remotion';
import {SceneCustomer} from './SceneCustomer';

// Remotion Docs:
// https://remotion.dev/docs

// @remotion/three Docs:
// https://remotion.dev/docs/three

// React Three Fiber Docs:
// https://docs.pmnd.rs/react-three-fiber/getting-started/introduction

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{/* <Composition
				id="Scene"
				component={Scene}
				durationInFrames={300}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					videoSrc:
						deviceType === 'phone'
							? staticFile('phone.mp4')
							: staticFile('tablet.mp4'),
					baseScale: deviceType === 'phone' ? 1 : 1.8,
				}}
			/> */}
			<Composition
				id="SceneCustomer"
				component={ SceneCustomer }
				durationInFrames={300}
				fps={30}
				width={1280}
				height={720}
			/>
		</>
	);
};
