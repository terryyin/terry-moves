import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from 'src/models/Subtitles';
import { Subtitles } from 'src/video_components/Subtitles';
import { CurrentSubtitle } from 'src/models/CurrentSubtitle';

const subtitle: Subtitle = 
  { id: 'subtitle1', startTime: 1, endTime: 3, text: 'First subtitle.' };

const currentSubtitle: CurrentSubtitle = {
  globalFps: 30,
  globalFrame: 60,
  subtitle,
  text: 'nah nah nah',
};

describe('Subtitles component', () => {
  test('displays the correct subtitle text when there is an active subtitle', () => {
    render(<Subtitles currentSubtitle={currentSubtitle} />);
    expect(screen.getByText('nah nah nah')).toBeInTheDocument();
  });
});