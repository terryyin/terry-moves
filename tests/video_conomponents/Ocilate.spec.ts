import '@testing-library/jest-dom/extend-expect';
import {makeMe} from '../helpers/makeMe';

describe('AnimationContext', () => {
	describe('scaleToUpperLeft combined', () => {
		[
			{sec: 0, expectPlaying:  [0, 0, 0],  },
			{sec: 1, expectPlaying: [0, 0, 0],   },
			{sec: 1.2, expectPlaying: [-0.9510565162951535, -1.902113032590307, 0],   },
			{sec: 2, expectPlaying: [2.4492935982947064e-16, 4.898587196589413e-16, 0],   },
		].forEach(({sec, expectPlaying, }) => {
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
				expect(result.position.x).toBe(expectPlaying[0]);
				expect(result.position.y).toBe(expectPlaying[1]);
				expect(result.position.z).toBe(expectPlaying[2]);
			});
		});
	});
});
