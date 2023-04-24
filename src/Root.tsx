import {Composition} from 'remotion';
import { StoryProductDeveloper } from './StoryProductDeveloper';
import { StoryFailureVsFailure } from './StoryFailureVsFailure';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<StoryFailureVsFailure />
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
