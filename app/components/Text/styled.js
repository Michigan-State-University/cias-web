import styled from 'styled-components';
import Truncate from 'react-truncate';

import { text, style } from '../BaseComponentStyles';

export const StyledEllipsisText = styled(Truncate).attrs(
  ({ $styleProps, ...props }) => ({ ...props, ...$styleProps }),
)`
  position: relative;
  width: 100%;
  ${text};
  ${style};
`;
