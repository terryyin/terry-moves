// UseCurrentSubtitle.test.ts
import { useCurrentSubtitle1 } from '@/hooks/useCurrentSubtitle';
import { Subtitle } from '@/models/Subtitles';

describe('useCurrentSubtitle1', () => {
  const subtitles: Subtitle[] = [
    { id: '1', leadingBlank: 1, duration: 1, text: 'First subtitle' },
    { id: '2', leadingBlank: 1, duration: 1, text: 'Second subtitle' },
    { id: '3', leadingBlank: 0, duration: 2, text: 'Third subtitle' },
  ];

  it('should return the first subtitle if before the first one', () => {
    const animationContext = useCurrentSubtitle1(subtitles, 1, 30);
    expect(animationContext.subtitle.id).toEqual("1");
    expect(animationContext.text).toEqual("");
  });

  it('should return the first subtitle if it is within the first duration', () => {
    const animationContext = useCurrentSubtitle1(subtitles, 31, 30);
    expect(animationContext.subtitle.id).toEqual("1");
    expect(animationContext.text).toEqual("First subtitle");
  });

  it('should return the first subtitle if its before the 2nd', () => {
    const animationContext = useCurrentSubtitle1(subtitles, 61, 30);
    expect(animationContext.subtitle.id).toEqual("2");
    expect(animationContext.text).toEqual("");
  });

  it('should return the second subtitle if its within 2nd', () => {
    const animationContext = useCurrentSubtitle1(subtitles, 91, 30);
    expect(animationContext.subtitle.id).toEqual("2");
    expect(animationContext.text).toEqual("Second subtitle");
  });

  it('should return the last subtitle if its after the last one', () => {
    const animationContext = useCurrentSubtitle1(subtitles, 1000, 30);
    expect(animationContext.subtitle.id).toEqual("3");
    expect(animationContext.text).toEqual("");
  });

});