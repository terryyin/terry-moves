import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import { Subtitles } from '@/video_components/Subtitles';
import { AnimationContext } from '@/models/AnimationContext';
import { AnimationContextProvider } from '@/hooks/useAnimationContext';

describe('Subtitles component', () => {

  const renderSubtitle = (subtitle: Subtitle) => {
    const animationContext: AnimationContext = {
      allSubtitles: [subtitle],
      globalFps: 30,
      globalFrame: 60,
    };

    const { container } = render(
      <AnimationContextProvider value={animationContext}>
        <Subtitles/>
      </AnimationContextProvider>
    );
    const div = container.querySelector<HTMLDivElement>('div div');
    if (!div) throw new Error('Div not found');
    return window.getComputedStyle(div);
  }

  test('displays the correct subtitle text when there is an active subtitle', () => {
    const style = renderSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.' });
    expect(screen.getByText('First subtitle.')).toBeInTheDocument();
    expect(style.getPropertyValue('width')).toBe("100%");
  });

  test('font size', () => {
    renderSubtitle({ leadingBlank: 1, duration: 3, text: 'First subtitle.', size: 1.5 });
    expect(screen.getByText('First subtitle.')).toBeInTheDocument();
  });

});