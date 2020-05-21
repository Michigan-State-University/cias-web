import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights, colors } from 'theme';
import Text from '.';

const Comment = styled(Text)`
  margin: 0;
  font-family: ${fontFamily};
  font-size: ${fontSizes.small};
  line-height: ${lineHeights.small};
  color: ${colors.grey};
`;

export default Comment;
