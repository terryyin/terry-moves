import { StoryProductDeveloper } from './StoryProductDeveloper';
import { StoryFailureVsFailure } from './StoryFailureVsFailure';
import { StoryBooleanParameters } from './StoryBooleanParameters';
import { StoryBooleanReturns } from './StoryBooleanReturns';
import { StoryLeSSComplete } from './StoryLeSSComplete';
import { StoryScalingScrum } from './StoryScalingScrum';
import { StoryWhyWhyLeSS } from './StoryWhyWhyLeSS';
import { StoryTransparent } from './StoryTransparent';
import { StoryGameOfLife } from './StoryGameOfLife';
import { StoryBooleanData } from './StoryBooleanData';
import { StoryInterationSprint } from './StoryIternationSprint';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<StoryFailureVsFailure />
			<StoryBooleanParameters />
			<StoryBooleanData />
			<StoryBooleanReturns />
			<StoryLeSSComplete />
			<StoryScalingScrum />
			<StoryInterationSprint />
			<StoryWhyWhyLeSS />
			<StoryProductDeveloper />
			<StoryTransparent />
			<StoryGameOfLife />
		</>
	);
};

