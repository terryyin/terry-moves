import { StoryProductDeveloper } from './StoryProductDeveloper';
import { StoryFailureVsFailure } from './StoryFailureVsFailure';
import { StoryBooleanParameters } from './StoryBooleanParameters';
import { StoryBooleanReturns } from './StoryBooleanReturns';
import { StoryLeSSComplete } from './StoryLeSSComplete';
import { StoryScalingScrum } from './StoryScalingScrum';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<StoryFailureVsFailure />
			<StoryBooleanParameters />
			<StoryBooleanReturns />
			<StoryLeSSComplete />
			<StoryScalingScrum />
			<StoryProductDeveloper />
		</>
	);
};

