import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights } from 'theme';
import { margin, style } from '../BaseComponentStyles';

const H3 = styled.h3`
  margin: 0;
  font-family: ${fontFamily};
  font-size: ${fontSizes.h3};
  line-height: ${lineHeights.regular};
  ${margin}
  ${style}
`;

export default H3;
