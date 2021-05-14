import styled from 'styled-components';

import Box from 'components/Box';
import { colors, themeColors } from 'theme';

export const HoverableBox = styled(Box)`
  cursor: pointer;
  transition: 0.2s;
  border: 1px
    ${({ $isSelected }) =>
      $isSelected ? themeColors.secondary : 'transparent'}
    solid;

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
