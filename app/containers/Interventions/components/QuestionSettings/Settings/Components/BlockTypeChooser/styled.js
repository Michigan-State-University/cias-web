import React from 'react';
import styled, { css } from 'styled-components';

import StyledCircle from 'components/Circle/StyledCircle';
import Box from 'components/Box';
import { colors, themeColors } from 'theme';

export const DotCircle = props => <StyledCircle {...props} size="10px" />;

const hoverStyles = css`
  background-color: ${themeColors.primary};
  color: ${colors.white};
  border: none;
`;

export const DashedBox = styled(Box)`
  height: 40px;
  border: 1px dashed ${colors.greyishBlue};
  color: ${colors.greyishBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  transition: 0.2s;
  cursor: pointer;
  ${({ active, disabled }) => active && !disabled && hoverStyles};
  &:hover {
    ${({ disabled }) =>
      disabled
        ? {
            backgroundColor: colors.grey,
            color: colors.white,
            cursor: 'not-allowed',
          }
        : hoverStyles};
  }
`;
