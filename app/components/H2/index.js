import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights } from 'theme';
import { margin } from '../BaseComponentStyles';

const H2 = styled.h2`
  margin: 0;
  font-family: ${fontFamily};
  font-size: ${fontSizes.h2};
  line-height: ${lineHeights.small};
  ${margin}
`;

export default H2;
