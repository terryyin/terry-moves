import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValueArrow } from '@/parts/ValueArrow';
import { useCurrentFrame } from 'remotion';

// Mock useCurrentFrame
jest.mock('remotion', () => ({
  ...jest.requireActual('remotion'),
  useCurrentFrame: jest.fn(),
}));

describe('ValueArrow component', () => {

  test('starting', () => {
    (useCurrentFrame as jest.Mock).mockReturnValue(0);
    const { container } = render(<ValueArrow />);
    const svgPath = container.querySelector('div svg path');
    expect(svgPath).toHaveAttribute('stroke-dashoffset', '100');
  });

  test('moving', () => {
    (useCurrentFrame as jest.Mock).mockReturnValue(10);
    const { container } = render(<ValueArrow />);
    const svgPath = container.querySelector('div svg path');
    expect(svgPath).toHaveAttribute('stroke-dashoffset', '90');
  });

});
