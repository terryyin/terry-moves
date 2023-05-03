import '@testing-library/jest-dom/extend-expect';
import {makeMe} from '../helpers/makeMe';

describe('AnimationContext', () => {
	describe('two moves not overlapped combined', () => {
		[
			{sec: 0.5, expectedX: 0,  },
			{sec: 1, expectedX: 0,   },
			{sec: 1.9, expectedX: 9.938779963713113, },
			{sec: 2.5, expectedX: 9.99920,},
			{sec: 3.1, expectedX: 8.0879},
			{sec: 4.1, expectedX: 0.01477},
		].forEach(({sec, expectedX, }) => {
			test(`test sec: ${sec}`, () => {
				const animationContext = makeMe.animationContext
					.withSubtitle({
						leadingBlank: 1,
						duration: 10,
						text: 'First subtitle.',
						actions: [
							{
								actor: 'under-test',
								actionType: 'oscillate',
								endingTimeAdjustment: 10,
								delta: [0, 0, 0],
							},
							{
								actor: 'under-test',
								actionType: 'move',
								duration: 1,
								absolutePosition: [10, 0, 0],
							},
							{
								actor: 'under-test',
								actionType: 'move',
								duration: 1,
								offset: 2,
								absolutePosition: [0, 0, 0],
							},
						],
					})
					.seconds(sec)
					.please();

				const result = animationContext.get3DObjectStateOf('under-test');
				expect(result.position.x).toBeCloseTo(expectedX, 2);
			});
		});
	});

	describe('scaleToUpperLeft combined', () => {
		[
			{sec: 0, expectPlaying: "scale(0.5) translateX(0px) translateY(0px)",  },
			{sec: 1, expectPlaying: "scale(0.5) translateX(0px) translateY(0px)",   },
			{sec: 1.1, expectPlaying: "scale(0.5956039322945006) translateX(0.0956039322945006px) translateY(0.1912078645890012px)", },
			{sec: 2.1, expectPlaying: "scale(0.9992614079320321) translateX(0.49926140793203216px) translateY(0.9985228158640643px)",},
			{sec: 3.1, expectPlaying: "scale(1.1912078645890012) translateX(0.5956039322945006px) translateY(1.1912078645890012px)",},
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
								actionType: 'scale',
								duration: 1,
								outputRange: [0.5, 1],
							},
							{
								actor: 'under-test',
								actionType: 'move',
								duration: 1,
								absolutePosition: [0.5, 1],
							},
						],
					})
					.withSubtitle({
						leadingBlank: 1,
						duration: 1,
						text: 'First subtitle.',
						actions: [
							{
								actor: 'under-test',
								actionType: 'scale',
								duration: 1,
								outputRange: [1, 2],
							},
							{
								actor: 'under-test',
								actionType: 'move',
								duration: 1,
								absolutePosition: [1, 2],
							},
	
						],
					})
					.seconds(sec)
					.please();
				const result = animationContext.get3DObjectStateOf('under-test').toStyle();
				expect(result.transform).toContain(expectPlaying);
			});
		});
	});

});
