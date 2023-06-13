import styled from 'styled-components';
import Truncate from 'react-truncate';

import Box from 'components/Box';

import { text, style, layout } from '../BaseComponentStyles';

export const StyledEllipsisText = styled(Truncate).attrs(
  ({ $styleProps, ...props }) => ({ ...props, ...$styleProps }),
)`
  position: relative;
  //width: 100%;
  ${text};
  ${style};
  ${layout};
`;

export const TruncatedMarkup = styled(Box)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
