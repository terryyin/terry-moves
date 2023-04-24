import {Composition} from 'remotion';
import { StoryProductDeveloper } from './StoryProductDeveloper';
import { Story } from './video_components/Story';
import { StoryFailureVsFailure, storyFailureVsFailureSubtitles } from './StoryFailureVsFailure';

export const RemotionRoot: React.FC = () => {
	return (
		<>
		  <Story id="story1" subtitles={storyFailureVsFailureSubtitles}  >
				<StoryFailureVsFailure />
			</Story>
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
