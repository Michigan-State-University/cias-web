import styled from 'styled-components';

import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';

import { colors, themeColors } from 'theme';

export const DashedBox = styled(Box).attrs(props => ({
  onClick: props.disabled ? null : props.onClick,
}))`
  height: 40px;
  border: 1px dashed ${colors.greyishBlue};
  color: ${colors.greyishBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  ${({ disabled }) =>
    disabled
      ? {
          '&:hover': {
            backgroundColor: colors.grey,
            color: colors.white,
          },
        }
      : {
          '&:hover': {
            backgroundColor: themeColors.primary,
            color: colors.white,
            border: 'none',
          },
          cursor: 'pointer',
        }}
`;

export const CaseInput = styled(StyledInput)`
  width: 50px;
`;
