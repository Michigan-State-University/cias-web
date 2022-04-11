import keys from 'lodash/keys';
import forEach from 'lodash/forEach';
import extend from 'lodash/extend';
import { containerBreakpoints } from 'components/Container/containerBreakpoints';

const generateMinQueries = () => {
  const mediaQueries = {};

  forEach(keys(containerBreakpoints), (breakpoint) => {
    extend(mediaQueries, {
      [breakpoint]: `(min-width: ${containerBreakpoints[breakpoint]}px)`,
    });
  });

  return mediaQueries;
};

const generateMaxQueries = () => {
  const mediaQueries = {};

  forEach(keys(containerBreakpoints), (breakpoint) => {
    extend(mediaQueries, {
      [breakpoint]: `(max-width: ${containerBreakpoints[breakpoint] - 1}px)`,
    });
  });

  return mediaQueries;
};

export const minQueries = generateMinQueries();
export const maxQueries = generateMaxQueries();
