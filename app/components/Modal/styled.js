import styled from 'styled-components';

import Box from 'components/Box';
import { colors, mediaQuery } from 'theme';

export const StyledBox = styled(Box)`
  ${mediaQuery.mobile`
    max-height: calc(100% - 20px);
    max-width: none;
    min-width: 0;
    width: calc(100% - 20px);
  `}
`;

export const StyledPopover = styled(Box)`
  background-color: ${colors.linkWater};
  border: 1px solid ${colors.periwinkleGray};
`;

export const StyledPopoverContent = styled(Box)`
  padding: 24px;
`;

export const StyledArrow = styled(Box)`
  position: absolute;
  background-color: ${colors.linkWater};
  border: 0px solid ${colors.periwinkleGray};
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  border-radius: 0;
`;
