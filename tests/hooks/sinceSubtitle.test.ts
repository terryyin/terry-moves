import AnimationContextWrapper from '@/models/AnimationContextWrapper';
// UseCurrentSubtitle.test.ts
import { Subtitle } from '@/models/Subtitles';

describe('sinceSubtitle', () => {
  const subtitles: Subtitle[] = [
    { id: '1', leadingBlank: 1, duration: 1, text: 'First subtitle' },
    { id: '2', leadingBlank: 1, duration: 1, text: 'Second subtitle' },
    { id: '3', leadingBlank: 0, duration: 2, text: 'Third subtitle' },
  ];

  it('should be false before the subtitle', () => {
    const animationContext: AnimationContextWrapper = new AnimationContextWrapper({
      allSubtitles: subtitles,
      globalFps: 30,
      globalFrame: 0,
    });

    expect(animationContext.sinceSubtitle("1")).toBeFalsy();
  });

  it('should be true during the subtitle', () => {
    const animationContext: AnimationContextWrapper = new AnimationContextWrapper({
      allSubtitles: subtitles,
      globalFps: 30,
      globalFrame: 45,
    });

    expect(animationContext.sinceSubtitle("1")).toBeTruthy();
  });

});
