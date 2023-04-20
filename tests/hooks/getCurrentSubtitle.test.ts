import AnimationContextWrapper from '@/models/AnimationContextWrapper';
import { Subtitle } from '@/models/Subtitles';

function getCurrentSubtitleText(subtitles: Subtitle[], frame: number, fps: number) {
  const animationContextWrapeper = new AnimationContextWrapper({
    allSubtitles: subtitles,
    globalFps: fps,
    globalFrame: frame,
  });
  return animationContextWrapeper.getCurrentSubtitleText();
}

describe('useCurrentSubtitle1', () => {
  const subtitles: Subtitle[] = [
    { id: '1', leadingBlank: 1, duration: 1, text: 'First subtitle' },
    { id: '2', leadingBlank: 1, duration: 1, text: 'Second subtitle' },
    { id: '3', leadingBlank: 0, duration: 2, text: 'Third subtitle' },
  ];

  it('should return the first subtitle if before the first one', () => {
    const text = getCurrentSubtitleText(subtitles, 1, 30);
    expect(text).toEqual("");
  });

  it('should return the first subtitle if it is within the first duration', () => {
    const text = getCurrentSubtitleText(subtitles, 31, 30);
    expect(text).toEqual("First subtitle");
  });

  it('should return the first subtitle if its before the 2nd', () => {
    const text = getCurrentSubtitleText(subtitles, 61, 30);
    expect(text).toEqual("");
  });

  it('should return the second subtitle if its within 2nd', () => {
    const text = getCurrentSubtitleText(subtitles, 91, 30);
    expect(text).toEqual("Second subtitle");
  });

  it('should return the last subtitle if its after the last one', () => {
    const text = getCurrentSubtitleText(subtitles, 1000, 30);
    expect(text).toEqual("");
  });

});
