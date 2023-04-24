export type InterpolateRanges = {
  inputRange: number[];
  outputRange: number[];
}

export function combineInterpolates(
  ranges1?: InterpolateRanges,
  ranges2?: InterpolateRanges,
): InterpolateRanges | undefined {
  if (!ranges1 || ranges1.inputRange.length === 0) {
    return ranges2;
  }

  if (!ranges2 || ranges2.inputRange.length === 0) {
    return ranges1;
  }

  const inputRange = [...ranges1.inputRange, ...ranges2.inputRange];
  const outputRange = [...ranges1.outputRange, ...ranges2.outputRange];

  for (let i = 0; i < inputRange.length - 1; i++) {
    for (let j = i + 1; j < inputRange.length; j++) {
      if (inputRange[i] > inputRange[j]) {
        [inputRange[i], inputRange[j]] = [inputRange[j], inputRange[i]];
        [outputRange[i], outputRange[j]] = [outputRange[j], outputRange[i]];
      }
    }
  }

  for (let i = 0; i < inputRange.length - 1; i++) {
    if (inputRange[i] === inputRange[i + 1]) {
      outputRange[i] = (outputRange[i] + outputRange[i + 1]) / 2;
      inputRange.splice(i + 1, 1);
      outputRange.splice(i + 1, 1);
    }
  }

  return {
    inputRange,
    outputRange,
  };
}
