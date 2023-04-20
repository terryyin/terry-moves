import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from '@/models/Subtitles';
import { Subtitles } from '@/video_components/Subtitles';
import { CurrentSubtitle } from '@/models/CurrentSubtitle';

const subtitle: Subtitle = 
  { id: 'subtitle1', leadingBlank: 1, duration: 3, text: 'First subtitle.' };

const currentSubtitle: CurrentSubtitle = {
  allSubtitles: [subtitle],
  globalFps: 30,
  globalFrame: 60,
  text: 'nah nah nah',
};

describe('Subtitles component', () => {
  test('displays the correct subtitle text when there is an active subtitle', () => {
    render(<Subtitles currentSubtitle={currentSubtitle} />);
    expect(screen.getByText('nah nah nah')).toBeInTheDocument();
  });
});