// UseCurrentSubtitle.test.ts
import { sinceSubtitle } from '@/hooks/useCurrentSubtitle';
import { Subtitle } from '@/models/Subtitles';

describe('sinceSubtitle', () => {
  const subtitles: Subtitle[] = [
    { id: '1', leadingBlank: 1, duration: 1, text: 'First subtitle' },
    { id: '2', leadingBlank: 1, duration: 1, text: 'Second subtitle' },
    { id: '3', leadingBlank: 0, duration: 2, text: 'Third subtitle' },
  ];

  it('should be false before the subtitle', () => {
    const animationContext = {
      allSubtitles: subtitles,
      globalFps: 30,
      globalFrame: 0,
      subtitle: subtitles[1],
      text: 'First subtitle',
    };

    expect(sinceSubtitle(animationContext, "1")).toBeFalsy();
  });

  it('should be true during the subtitle', () => {
    const animationContext = {
      allSubtitles: subtitles,
      globalFps: 30,
      globalFrame: 45,
      subtitle: subtitles[1],
      text: 'First subtitle',
    };

    expect(sinceSubtitle(animationContext, "1")).toBeTruthy();
  });

});
