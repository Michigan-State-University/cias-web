import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights, colors } from 'theme';
import { style, padding, border, margin } from '../BaseComponentStyles';
import Text from '.';

const Comment = styled(Text)`
  margin: 0;
  font-family: ${fontFamily};
  font-size: ${fontSizes.small};
  line-height: ${lineHeights.small};
  color: ${colors.grey};
  ${style};
  ${padding};
  ${margin};
  ${border};
`;

export default Comment;
