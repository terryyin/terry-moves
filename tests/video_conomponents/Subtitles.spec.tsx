import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import { Subtitles } from '@/video_components/Subtitles';
import { AnimationContext } from '@/models/AnimationContext';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';

const subtitle: Subtitle = 
  { leadingBlank: 1, duration: 3, text: 'First subtitle.' };

const animationContext: AnimationContext = {
  allSubtitles: [subtitle],
  globalFps: 30,
  globalFrame: 60,
};

describe('Subtitles component', () => {
  test('displays the correct subtitle text when there is an active subtitle', () => {
    render(
      <AnimationContextProvider value={animationContext}>
        <Subtitles/>
      </AnimationContextProvider>
    );
    expect(screen.getByText('First subtitle.')).toBeInTheDocument();
  });
});