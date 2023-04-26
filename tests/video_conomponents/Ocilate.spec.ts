import '@testing-library/jest-dom/extend-expect';
import {makeMe} from '../helpers/makeMe';

describe('AnimationContext', () => {
	describe('scaleToUpperLeft combined', () => {
		[
			{sec: 0, expectPosition:  [0, 0, 0],  },
			{sec: 1, expectPosition: [0, 0, 0],   },
			{sec: 1.2, expectPosition: [-0.9510565162951535, -1.902113032590307, -2.8531695488854605],   },
			{sec: 2, expectPosition: [2.4492935982947064e-16, 4.898587196589413e-16, 7.347880794884119e-16],   },
		].forEach(({sec, expectPosition, }) => {
			test(`test sec: ${sec}`, () => {
				const animationContext = makeMe.animationContext
					.withSubtitle({
						leadingBlank: 1,
						duration: 1,
						text: 'First subtitle.',
						actions: [
							{
								actor: 'under-test',
								actionType: 'ocillate',
								duration: 1,
								distances: [1, 2, 3],
							},
						],
					})
					.seconds(sec)
					.please();
				const result = animationContext.get3DGroupAttributes('under-test');
				expect(result.position.x).toBe(expectPosition[0]);
				expect(result.position.y).toBe(expectPosition[1]);
				expect(result.position.z).toBe(expectPosition[2]);
			});
		});
	});
});