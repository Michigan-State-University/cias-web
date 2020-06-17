import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights } from 'theme';
import { margin, style, text } from '../BaseComponentStyles';

const H3 = styled.h3`
  margin: 0;
  font-family: ${fontFamily};
  font-size: ${fontSizes.h3};
  line-height: ${lineHeights.regular};
  text-decoration: ${({ textDecoration }) => textDecoration || ''};
  cursor: ${({ cursor }) => cursor || ''};
  ${margin}
  ${style}
  ${text};
`;

export default H3;
