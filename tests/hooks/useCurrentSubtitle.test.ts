// UseCurrentSubtitle.test.ts
import { useCurrentSubtitle } from '@/hooks/useCurrentSubtitle';
import { Subtitle } from '@/models/Subtitles';

describe('useCurrentSubtitle', () => {
  const subtitles: Subtitle[] = [
    { id: '1', startTime: 1, endTime: 2, text: 'First subtitle' },
    { id: '2', startTime: 3, endTime: 4, text: 'Second subtitle' },
    { id: '3', startTime: 4, endTime: 6, text: 'Third subtitle' },
  ];

  it('should return the first subtitle if nothing defined', () => {
    const currentSubtitle = useCurrentSubtitle(subtitles, 1, 30);
    expect(currentSubtitle.subtitle.id).toEqual("1");
    expect(currentSubtitle.text).toEqual("");
  });

  it('should return the correct subtitle for the given frame', () => {
    const currentSubtitle = useCurrentSubtitle(subtitles, 60, 30);

    expect(currentSubtitle.globalFps).toEqual(30);
    expect(currentSubtitle.globalFrame).toEqual(60);
    expect(currentSubtitle.subtitle).toEqual(subtitles[0]);
    expect(currentSubtitle.text).toEqual(subtitles[0].text);
  });

  it('should return the previous title if the next title havenot started yet', () => {
    const currentSubtitle = useCurrentSubtitle(subtitles, 65, 30);
    expect(currentSubtitle.subtitle.id).toEqual("1");
    expect(currentSubtitle.text).toEqual("");
  });

  it('should return the next one', () => {
    const currentSubtitle = useCurrentSubtitle(subtitles, 91, 30);
    expect(currentSubtitle.subtitle.id).toEqual("2");
    expect(currentSubtitle.text).toEqual("Second subtitle");
  });

});
