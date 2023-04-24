import '@testing-library/jest-dom/extend-expect';
import {makeMe} from '../helpers/makeMe';

describe('AnimationContext', () => {
	describe('scaleToUpperLeft combined', () => {
		[
			{sec: 0, expectPlaying: "scale(1) translateX(0%) translateY(0%)",  },
			{sec: 1, expectPlaying: "scale(1) translateX(0%) translateY(0%)",   },
			{sec: 1.1, expectPlaying: "scale(1) translateX(0%) translateY(0%)", },
			{sec: 2.1, expectPlaying: "scale(1) translateX(0%) translateY(0%)",},
			{sec: 3.1, expectPlaying: "scale(1.1) translateX(-10%) translateY(10%)",},
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
								actionType: 'scaleToUpperRight',
								duration: 1,
								outputRange: [50, 100],
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
								actionType: 'scaleToUpperRight',
								duration: 1,
								outputRange: [100, 200],
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
