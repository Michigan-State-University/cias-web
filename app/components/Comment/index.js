import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights, colors } from 'theme';
import { margin, text } from '../BaseComponentStyles';

const Comment = styled.p`
  font-family: ${fontFamily};
  font-size: ${fontSizes.small};
  line-height: ${lineHeights.small};
  color: ${colors.grey};
  ${margin};
  ${text};
`;

export default Comment;
