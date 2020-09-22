import findLastIndex from 'lodash/findLastIndex';

// library specific breakpoints
export const containerBreakpoints = [576, 768, 992, 1200, 1600];

export const containerWidths = [540, 750, 960, 1140, 1540];

export const calculateWidth = width => {
  const lastMatchingIndex = findLastIndex(
    containerBreakpoints,
    breakpoint => width >= breakpoint,
  );

  if (lastMatchingIndex > -1) return `${containerWidths[lastMatchingIndex]}px`;

  return 'initial';
};
