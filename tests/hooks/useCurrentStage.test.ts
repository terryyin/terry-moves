import { useCurrentStage } from "src/hooks/useCurrentSubtitle";
import { Subtitle } from "src/models/Subtitles";

interface StageTransform {
  subtitleId: string;
  durationInSeconds: number;
}

describe('useCurrentStage', () => {
  const CurrentSubtitle = {
    globalFps: 30,
    globalFrame: 60,
    subtitle: { id: '1', startTime: 0, endTime: 2, text: 'First subtitle' },
    text: 'First subtitle',
  };

  it('should return the correct interpolated value based on the stage transform', () => {
    const subtitles: Subtitle[] = [
      { id: 'subtitle1', startTime: 1, endTime: 3, text: 'First subtitle.' },
      { id: 'subtitle2', startTime: 4, endTime: 6, text: 'Second subtitle.' },
      { id: 'subtitle3', startTime: 7, endTime: 9, text: 'Third subtitle.' },
    ];

    const stageTransforms: StageTransform[] = [
      { subtitleId: 'subtitle2', durationInSeconds: 1 },
    ];

    const result = useCurrentStage(subtitles, stageTransforms, CurrentSubtitle);

    expect(result).toEqual(100);
  });

  it('should throw an error if no stage transform is found', () => {
    const subtitles: Subtitle[] = [];
    const stageTransforms: StageTransform[] = [];
    expect(() => useCurrentStage(subtitles, stageTransforms, CurrentSubtitle)).toThrowError(
      'No stage transform found'
    );
  });

  it('should throw an error if no target subtitle is found', () => {
    const subtitles: Subtitle[] = [];
    const stageTransforms: StageTransform[] = [
      { subtitleId: 'subtitle2', durationInSeconds: 1 },
    ];

    expect(() => useCurrentStage(subtitles, stageTransforms, CurrentSubtitle)).toThrowError(
      'No target subtitle found'
    );
  });
});
