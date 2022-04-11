import values from 'lodash/values';
import sortBy from 'lodash/sortBy';
import findLastIndex from 'lodash/findLastIndex';

// library specific breakpoints
export const containerBreakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

export const additionalBreakpoints = {
  desktopSm: 1024,
};

export const containerWidths = [540, 750, 960, 1140, 1540];

export const calculateWidth = (width) => {
  const lastMatchingIndex = findLastIndex(
    sortBy(values(containerBreakpoints)),
    (breakpoint) => width >= breakpoint,
  );

  if (lastMatchingIndex > -1) return `${containerWidths[lastMatchingIndex]}px`;

  return 'initial';
};
