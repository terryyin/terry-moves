import { StoryProductDeveloper } from './StoryProductDeveloper';
import { StoryFailureVsFailure } from './StoryFailureVsFailure';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<StoryFailureVsFailure />
			<StoryProductDeveloper />
		</>
	);
};
