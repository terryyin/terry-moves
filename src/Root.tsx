import {Composition} from 'remotion';
import {StoryFailureVsFailure} from './StoryFailureVsFailure';
import { StoryProductDeveloper } from './StoryProductDeveloper';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="SceneCustomer"
				component={ StoryFailureVsFailure }
				durationInFrames={40*30}
				fps={30}
				width={1280}
				height={720}
			/>
			<Composition
				id="StoryProductDeveloper"
				component={ StoryProductDeveloper }
				durationInFrames={40*30}
				fps={30}
				width={1280}
				height={720}
			/>

		</>
	);
};
