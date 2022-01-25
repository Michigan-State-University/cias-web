import styled from 'styled-components';

import { colors, mediaQuery } from 'theme';

import Box from 'components/Box';
import { maxQueries } from 'components/Container/mediaQuery';

const DIM_Z_INDEX = 10;
const POPOVER_Z_INDEX = 11;

const mobilePopoverStyle = {
  width: '100%',
  height: 'max(50%, 400px)',
  bottom: '0px !important',
  left: '0px !important',
  top: 'initial !important',
  right: 'initial !important',
  border: 'initial !important',
  borderRadius: '32px 32px 0px 0px',
};

const mobileDimStyle = {
  top: -50,
  width: '100%',
  height: '100%',
  backgroundColor: colors.black,
  opacity: 0.4,
};

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
  z-index: ${POPOVER_Z_INDEX};

  @media ${maxQueries.sm} {
    position: fixed !important;
    ${mobilePopoverStyle};
  }

  ${({ $forceMobile }) =>
    $forceMobile && {
      // absolute when mobile view on preview
      position: 'absolute !important',
      ...mobilePopoverStyle,
    }}
`;

export const StyledPopoverContent = styled(Box)`
  padding: 24px;
`;

export const DimBackground = styled(Box)`
  z-index: ${DIM_Z_INDEX};
  border-radius: 0;
  @media ${maxQueries.sm} {
    position: fixed !important;
    ${mobileDimStyle};
  }

  ${({ $forceMobile }) =>
    $forceMobile && {
      position: 'absolute !important',
      ...mobileDimStyle,
    }}
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
