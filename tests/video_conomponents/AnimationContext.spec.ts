import '@testing-library/jest-dom/extend-expect';
import {makeMe} from '../helpers/makeMe';

describe('AnimationContext', () => {
	describe('scaleToUpperLeft combined', () => {
		[
			{sec: 0, expectPlaying: "scale(0.5) translateX(0px) translateY(0px)",  },
			{sec: 1, expectPlaying: "scale(0.5) translateX(0px) translateY(0px)",   },
			{sec: 1.1, expectPlaying: "scale(0.55) translateX(0.05px) translateY(0.1px)", },
			{sec: 2.1, expectPlaying: "scale(1) translateX(0.5px) translateY(1px)",},
			{sec: 3.1, expectPlaying: "scale(1.1) translateX(0.55px) translateY(1.1px)",},
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
								distances: [0.5, 1],
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
								distances: [1, 2],
							},
	
						],
					})
					.seconds(sec)
					.please();
				const result = animationContext.getStyleOf('under-test');
				expect(result.transform).toBe(expectPlaying);
			});
		});
	});
});
