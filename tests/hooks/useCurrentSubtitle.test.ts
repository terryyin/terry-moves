// UseCurrentSubtitle.test.ts
import { useCurrentSubtitle } from '@/hooks/useCurrentSubtitle';
import { Subtitle } from '@/models/Subtitles';

describe('useCurrentSubtitle1', () => {
  const subtitles: Subtitle[] = [
    { id: '1', leadingBlank: 1, duration: 1, text: 'First subtitle' },
    { id: '2', leadingBlank: 1, duration: 1, text: 'Second subtitle' },
    { id: '3', leadingBlank: 0, duration: 2, text: 'Third subtitle' },
  ];

  it('should return the first subtitle if before the first one', () => {
    const currentSubtitle = useCurrentSubtitle(subtitles, 1, 30);
    expect(currentSubtitle.subtitle.id).toEqual("1");
    expect(currentSubtitle.text).toEqual("");
  });

  it('should return the first subtitle if it is within the first duration', () => {
    const currentSubtitle = useCurrentSubtitle(subtitles, 31, 30);
    expect(currentSubtitle.subtitle.id).toEqual("1");
    expect(currentSubtitle.text).toEqual("First subtitle");
  });

  it('should return the first subtitle if its before the 2nd', () => {
    const currentSubtitle = useCurrentSubtitle(subtitles, 61, 30);
    expect(currentSubtitle.subtitle.id).toEqual("2");
    expect(currentSubtitle.text).toEqual("");
  });

  it('should return the second subtitle if its within 2nd', () => {
    const currentSubtitle = useCurrentSubtitle(subtitles, 91, 30);
    expect(currentSubtitle.subtitle.id).toEqual("2");
    expect(currentSubtitle.text).toEqual("Second subtitle");
  });

  it('should return the last subtitle if its after the last one', () => {
    const currentSubtitle = useCurrentSubtitle(subtitles, 1000, 30);
    expect(currentSubtitle.subtitle.id).toEqual("3");
    expect(currentSubtitle.text).toEqual("");
  });

});