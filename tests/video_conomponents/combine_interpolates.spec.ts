import { combineInterpolates } from '@/models/combine_interpolates';
import '@testing-library/jest-dom/extend-expect';

describe('combining two interpolate ranges', () => {
  it('gets nothing when combining nothing to nothing', () => {
    const result = combineInterpolates({inputRange: [], outputRange: []}, {inputRange: [], outputRange: []});
    expect(result?.inputRange).toEqual([]);
  });

  it('gets the first when combining to nothing', () => {
    const result = combineInterpolates({inputRange: [1, 2], outputRange: [100, 200]}, {inputRange: [], outputRange: []});
    expect(result?.inputRange).toEqual([1, 2]);
    expect(result?.outputRange).toEqual([100, 200]);
  });

  it('gets the second when nothing combining to something', () => {
    const result = combineInterpolates({inputRange: [], outputRange: []}, {inputRange: [1, 2], outputRange: [100, 200]});
    expect(result?.inputRange).toEqual([1, 2]);
    expect(result?.outputRange).toEqual([100, 200]);
  });

  it('combines the two if there is no overlap', () => {
    const result = combineInterpolates({inputRange: [1,2], outputRange: [100, 200]}, {inputRange: [3, 4], outputRange: [300, 400]});
    expect(result?.inputRange).toEqual([1, 2, 3, 4]);
    expect(result?.outputRange).toEqual([100, 200, 300, 400]);
  });

  it('merges the two if they are next to each other, and average the connecting output', () => {
    const result = combineInterpolates({inputRange: [1,2], outputRange: [100, 200]}, {inputRange: [2, 3], outputRange: [300, 400]});
    expect(result?.inputRange).toEqual([1, 2, 3]);
    expect(result?.outputRange).toEqual([100, 250, 400]);
  });

  it('merges the two if they are next to each other, and get propotional output value', () => {
    const result = combineInterpolates({inputRange: [1,3], outputRange: [100, 200]}, {inputRange: [2, 4], outputRange: [300, 400]});
    expect(result?.inputRange).toEqual([1, 2, 3, 4]);
    expect(result?.outputRange).toEqual([100, 300, 200, 400]);
  });

  it('the left parameter could have more than 2 points', () => {
    const result = combineInterpolates({inputRange: [1,2, 3], outputRange: [100, 200, 300]}, {inputRange: [4, 5], outputRange: [400, 500]});
    expect(result?.inputRange).toEqual([1, 2, 3, 4,5]);
    expect(result?.outputRange).toEqual([100, 200, 300, 400, 500]);
  });

});
