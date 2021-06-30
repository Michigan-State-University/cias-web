import { createGlobalStyle } from 'styled-components';
import 'fonts.css';

import { themeColors, colors, fontSizes, lineHeights } from 'theme';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
    color: ${themeColors.text};
    scroll-behavior: smooth;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    color: ${themeColors.text};
    min-height: 100%;
    max-width: 100%;
    display: flex;
    flex: 1;
    align-items: stretch;
    overflow: auto;
  }

  #app {
    background-color: ${colors.zirkon};
    min-height: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
  }

  div {
    font-size: ${fontSizes.small};
    line-height: ${lineHeights.small};
  }

  p,
  label {
    line-height: 1.5em;
    margin: 0;
  }
`;

export default GlobalStyle;
