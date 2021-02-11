import styled from 'styled-components';
import Text from 'components/Text/index';
import { text, style } from '../BaseComponentStyles';

export const StyledEllipsisText = styled(Text)`
  position: relative;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${text};
  ${style};
`;
