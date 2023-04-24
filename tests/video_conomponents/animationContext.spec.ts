import '@testing-library/jest-dom/extend-expect';
import { makeMe } from '../helpers/makeMe';

describe('AnimationContext', () => {
  test(`total frames`, () => {
    const animationContext = makeMe
            .animationContext
            .withSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.' })
            .withSubtitle({ leadingBlank: 1, duration: 3, text: 'second subtitle.' })
            .please();
    const result = animationContext.getTotalFrame();
    expect(result).toBe(8 * 30);
  });
});
