import styled from 'styled-components';

import { boxShadows, colors, themeColors } from 'theme';

import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';

export const HoverableBox = styled(Box)`
  cursor: pointer;
  transition: 0.2s;
  border: 1px transparent solid;
  box-shadow: ${boxShadows.black};

  ${({ $isSelected }) =>
    $isSelected && {
      borderColor: themeColors.secondary,
    }}

  &:hover {
    border-color: ${themeColors.secondary};
  }
`;

export const ChartButtonBox = styled(HoverableBox)`
  padding: 7px;
  background-color: ${colors.white};
  width: 130px;
  height: 130px;
`;

export const Input = styled(StyledInput)`
  border: none;
  background-color: ${themeColors.highlight};
  outline: none;
  max-width: none;
  &:focus {
    border: none;
  }
`;
