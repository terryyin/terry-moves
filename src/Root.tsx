import { StoryProductDeveloper } from './StoryProductDeveloper';
import { StoryFailureVsFailure } from './StoryFailureVsFailure';
import { StoryBooleanParameters } from './StoryBooleanParameters';
import { StoryBooleanReturns } from './StoryBooleanReturns';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<StoryFailureVsFailure />
			<StoryBooleanParameters />
			<StoryBooleanReturns />
			<StoryProductDeveloper />
		</>
	);
};
