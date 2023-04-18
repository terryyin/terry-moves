// UseCurrentSubtitle.test.ts
import { useCurrentSubtitle } from 'src/hooks/useCurrentSubtitle';
import { Subtitle } from 'src/models/Subtitles';

describe('useCurrentSubtitle', () => {
  it('should return the correct subtitle for the given frame', () => {
    const subtitles: Subtitle[] = [
      { id: 'aa', startTime: 0, endTime: 2, text: 'First subtitle' },
      { id: 'aa', startTime: 2, endTime: 4, text: 'Second subtitle' },
      { id: 'aa', startTime: 4, endTime: 6, text: 'Third subtitle' },
    ];

    const frame = 60;
    const fps = 30;

    const currentSubtitle = useCurrentSubtitle(subtitles, frame, fps);

    expect(currentSubtitle.globalFps).toEqual(fps);
    expect(currentSubtitle.globalFrame).toEqual(frame);
    expect(currentSubtitle.subtitle).toEqual(subtitles[0]);
    expect(currentSubtitle.text).toEqual(subtitles[0].text);
  });

  it('should throw an error if no subtitle is found for the current frame', () => {
    const subtitles: Subtitle[] = [
      { id: 'aa', startTime: 0, endTime: 1, text: 'First subtitle' },
      { id: 'aa', startTime: 2, endTime: 3, text: 'Second subtitle' },
    ];

    const frame = 91;
    const fps = 30;

    expect(() => useCurrentSubtitle(subtitles, frame, fps)).toThrowError(
      'No subtitle found for current frame'
    );
  });
});
