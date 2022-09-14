import styled, { css } from 'styled-components';

import { colors, mediaQuery } from 'theme';

import Box from 'components/Box';
import { maxQueries, minQueries } from 'components/Container/mediaQuery';

import { DIM_Z_INDEX, POPOVER_Z_INDEX } from './constants';

const mobilePopoverStyle = css`
  width: 100%;
  max-height: max(85%, 400px);
  bottom: 0px !important;
  left: 0px !important;
  top: initial !important;
  right: initial !important;
  border: initial !important;
  border-radius: 32px 32px 0px 0px;
  overflow-y: auto;
`;

const mobileDimStyle = css`
  top: -50px;
  width: 100%;
  height: calc(100% + 50px);
  background-color: ${colors.black};
  opacity: 0.4;
`;

const mobileScrollStyle = css`
  max-height: 100% !important;
`;

const mobileArrowStyle = css`
  display: none;
`;

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

  ${({ $specialMobileView }) =>
    $specialMobileView &&
    css`
      @media ${maxQueries.sm} {
        position: fixed !important;
        ${mobilePopoverStyle};
      }
    `}

  ${({ $specialMobileView, $forceMobile }) =>
    $specialMobileView &&
    $forceMobile &&
    css`
      position: absolute !important;
      ${mobilePopoverStyle};
    `}
`;

export const StyledPopoverContent = styled(Box)`
  padding: 24px;
  overflow-y: auto;

  ${({ $specialMobileView }) =>
    $specialMobileView &&
    css`
      @media ${minQueries.sm} {
        max-height: 500px;
      }
    `}

  ${({ $specialMobileView }) =>
    $specialMobileView &&
    css`
      @media ${maxQueries.sm} {
        ${mobileScrollStyle};
      }
    `}



  ${({ $specialMobileView, $forceMobile }) =>
    $specialMobileView && $forceMobile && mobileScrollStyle}
`;

export const DimBackground = styled(Box)`
  z-index: ${DIM_Z_INDEX};
  border-radius: 0;

  ${({ $specialMobileView }) =>
    $specialMobileView &&
    css`
      @media ${maxQueries.sm} {
        position: fixed !important;
        ${mobileDimStyle};
      }
    `}

  ${({ $forceDim }) =>
    $forceDim &&
    css`
      position: fixed !important;
      ${mobileDimStyle};
    `}

  ${({ $forceMobile }) =>
    $forceMobile &&
    css`
      position: absolute !important;
      ${mobileDimStyle};
    `}
`;

export const StyledArrow = styled(Box)`
  position: absolute;
  background-color: inherit;
  border: 0px solid ${colors.periwinkleGray};
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  border-radius: 0;

  ${({ $specialMobileView }) =>
    $specialMobileView &&
    css`
      @media ${maxQueries.sm} {
        ${mobileArrowStyle};
      }
    `}

  ${({ $specialMobileView, $forceMobile }) =>
    $specialMobileView && $forceMobile && mobileArrowStyle}
`;
