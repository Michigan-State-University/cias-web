import { createGlobalStyle } from 'styled-components';
import Regular from 'assets/fonts/DMSans-Regular.ttf';
import RegularItalic from 'assets/fonts/DMSans-Italic.ttf';
import Medium from 'assets/fonts/DMSans-Medium.ttf';
import MediumItalic from 'assets/fonts/DMSans-MediumItalic.ttf';
import Bold from 'assets/fonts/DMSans-Bold.ttf';
import BoldItalic from 'assets/fonts/DMSans-BoldItalic.ttf';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  @font-face {
    font-family: 'DM Sans';
    font-weight: 400;
    src: url(${Regular});
  }

  @font-face {
    font-family: 'DM Sans';
    font-weight: 400;
    font-style: italic;
    src: url(${RegularItalic});
  }

  @font-face {
    font-family: 'DM Sans';
    font-weight: 500;
    src: url(${Medium});
  }

  @font-face {
    font-family: 'DM Sans';
    font-weight: 500;
    font-style: italic;
    src: url(${MediumItalic});
  }

  @font-face {
    font-family: 'DM Sans';
    font-weight: 700;
    src: url(${Bold});
  }

  @font-face {
    font-family: 'DM Sans';
    font-weight: 700;
    font-style: italic;
    src: ${BoldItalic};
  }

  body {
    font-family: 'DM Sans', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }

  #app {
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
