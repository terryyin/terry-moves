import { StageTransform, useCurrentStage } from "@/hooks/useCurrentSubtitle";
import { Subtitle } from "@/models/Subtitles";

describe('useCurrentStage', () => {
  const subtitles: Subtitle[] = [
    { id: 'subtitle1', leadingBlank: 1, duration: 2, text: 'First subtitle.' },
    { id: 'subtitle2', leadingBlank: 1, duration: 2, text: 'Second subtitle.' },
    { id: 'subtitle3', leadingBlank: 1, duration: 2, text: 'Third subtitle.' },
  ];

  const currentSubtitle = {
    allSubtitles: subtitles,
    globalFps: 30,
    globalFrame: 60,
    subtitle: subtitles[1],
    text: 'First subtitle',
  };

  it('should return the correct interpolated value based on the stage transform', () => {

    const stageTransforms: StageTransform[] = [
      { subtitleId: 'subtitle2', durationInSeconds: 1, outputRange: [50, 100]},
    ];

    const result = useCurrentStage(stageTransforms, currentSubtitle);

    expect(result).toEqual(50);
  });
});
