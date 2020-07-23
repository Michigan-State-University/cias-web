import { css } from 'styled-components';

const breakpoints = {
  mobileSm: '360px',
  mobile: '480px',
  tabletSm: '600px',
  tablet: '768px',
  desktopXs: '960px',
  desktopSm: '1024px',
  desktop: '1170px',
  laptopSm: '1280px',
  laptop: '1360px',
  wide: '1440px',
  xl: '1680px',
  xxl: '1740px',
};

const mediaQuery = {};

Object.keys(breakpoints).forEach(breakpointKey => {
  mediaQuery[breakpointKey] = (...args) => css`
    @media only screen and (max-width: ${breakpoints[breakpointKey]}) {
      ${css(...args)}
    }
  `;
});

export { mediaQuery };
