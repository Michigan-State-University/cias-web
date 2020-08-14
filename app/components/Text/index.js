import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights } from 'theme';
import { margin, text, layout, style } from '../BaseComponentStyles';

const Text = styled.p`
  font-family: ${fontFamily};
  font-size: ${fontSizes.small};
  line-height: ${lineHeights.small};
  ${margin};
  ${text};
  ${layout};
  ${style};
`;

export default Text;
