import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights } from 'theme';
import { margin, text } from '../BaseComponentStyles';

const Text = styled.p`
  margin: 0;
  font-family: ${fontFamily};
  font-size: ${fontSizes.small};
  line-height: ${lineHeights.small};
  ${margin};
  ${text};
`;

export default Text;
