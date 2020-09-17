import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights } from 'theme';
import { margin, text, style } from '../BaseComponentStyles';

const H1 = styled.h1`
  margin: 0;
  font-family: ${fontFamily};
  font-size: ${fontSizes.h1};
  line-height: ${lineHeights.small};
  ${margin};
  ${text};
  ${style};
`;

export default H1;
