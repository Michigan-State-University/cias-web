import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights } from 'theme';
import { margin, style, text } from '../BaseComponentStyles';

const H2 = styled.h2`
  margin: 0;
  font-family: ${fontFamily};
  font-size: ${fontSizes.h2};
  line-height: ${lineHeights.small};
  ${margin};
  ${style};
  ${text}
`;

export default H2;
