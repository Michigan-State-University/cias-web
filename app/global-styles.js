import { createGlobalStyle } from 'styled-components';
import { themeColors } from 'theme';
import { colors } from './theme/colors';
import 'fonts.css';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
    color: ${themeColors.text};
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

  p,
  label {
    line-height: 1.5em;
    margin: 0;
  }
`;

export default GlobalStyle;
