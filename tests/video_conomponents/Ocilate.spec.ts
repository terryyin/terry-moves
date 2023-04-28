import '@testing-library/jest-dom/extend-expect';
import {makeMe} from '../helpers/makeMe';

describe('AnimationContext', () => {

	describe('occillate', () => {
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
								actionType: 'oscillate',
								duration: 1,
								delta: [1, 2, 3],
							},
						],
					})
					.seconds(sec)
					.please();
				const result = animationContext.get3DObjectStateOf('under-test');
				expect(result.position.x).toBe(expectPosition[0]);
				expect(result.position.y).toBe(expectPosition[1]);
				expect(result.position.z).toBe(expectPosition[2]);
			});
		});
	});

	describe('occillate while moving', () => {
		[
			{sec: 0, expectPosition:  [0, 0, 0],  },
			{sec: 1, expectPosition: [0, 0, 0],   },
			{sec: 1.2, expectPosition: [-0.4759874630812576, -1.902113032590307, -2.8531695488854605],   },
			{sec: 2, expectPosition: [0.9969808363488776, 0, 0],   },
			{sec: 2.5, expectPosition: [0.9999201252394069, 4.898587196589413e-16, 7.347880794884119e-16],   },
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
								actionType: 'oscillate',
								duration: 1,
								delta: [1, 2, 3],
							},							
							{
								actor: 'under-test',
								actionType: 'move',
								duration: 1,
								absolutePosition: [1, 0, 0],
							},
						],
					})
					.seconds(sec)
					.please();
				const result = animationContext.get3DObjectStateOf('under-test');
				expect(result.position.x).toBeCloseTo(expectPosition[0], 2);
				expect(result.position.y).toBeCloseTo(expectPosition[1], 2);
				expect(result.position.z).toBeCloseTo(expectPosition[2], 2);
			});
		});
	});

	describe('moving with occillating', () => {
		[
			{sec: 0, expectX:  0,  },
			{sec: 1, expectX: 0,   },
			{sec: 1.2, expectX: -0.4759874630812576,   },
			{sec: 2, expectX: 0.9969808363488776,   },
			{sec: 2.1, expectX: 0.9985228158640646,   },
		].forEach(({sec, expectX, }) => {
			test(`test sec: ${sec}`, () => {
				const animationContext = makeMe.animationContext
					.withSubtitle({
						leadingBlank: 1,
						duration: 1,
						text: 'First subtitle.',
						actions: [
              {
								actor: 'under-test',
								actionType: 'move',
								duration: 1,
								absolutePosition: [1, 0, 0],
							},
							{
								actor: 'under-test',
								actionType: 'oscillate',
								duration: 1,
								delta: [1, 2, 3],
							},							
						],
					})
					.seconds(sec)
					.please();
				const result = animationContext.get3DObjectStateOf('under-test');
				expect(result.position.x).toBe(expectX);
			});
		});
	});

});
