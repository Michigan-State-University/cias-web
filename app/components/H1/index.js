import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights } from 'theme';
import { margin } from '../BaseComponentStyles';

const H1 = styled.h1`
  margin: 0;
  font-family: ${fontFamily};
  font-size: ${fontSizes.h1};
  line-height: ${lineHeights.small};
  ${margin}
`;

export default H1;
