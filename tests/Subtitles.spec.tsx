import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Subtitle } from 'src/models/Subtitles';
import { Subtitles } from 'src/video_components/Subtitles';

const subtitles: Subtitle[] = [
  { id: 'subtitle1', startTime: 1, endTime: 3, text: 'First subtitle.' },
  { id: 'subtitle2', startTime: 4, endTime: 6, text: 'Second subtitle.' },
  { id: 'subtitle3', startTime: 7, endTime: 9, text: 'Third subtitle.' },
];

interface SubtitlesWrapperProps {
  frame: number;
  fps: number;
}

const SubtitlesWrapper: React.FC<SubtitlesWrapperProps> = ({ frame, fps }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Subtitles subtitles={subtitles} frame={frame} fps={fps} />
    </div>
  );
};

describe('Subtitles component', () => {
  test('displays the correct subtitle text when there is an active subtitle', () => {
    render(<SubtitlesWrapper frame={90} fps={30} />);
    expect(screen.getByText('First subtitle.')).toBeInTheDocument();
  });

  test('displays the correct subtitle text when there is an active subtitle', () => {
    render(<SubtitlesWrapper frame={180} fps={30} />);
    expect(screen.getByText('Second subtitle.')).toBeInTheDocument();
  });

  test('does not display subtitle text when no subtitle is active', () => {
    const { container } = render(<SubtitlesWrapper frame={280} fps={30} />);
    expect(container.querySelector('span')).toBeNull();
  });

});
