import styled from 'styled-components';

import Box from 'components/Box';
import { colors, themeColors } from 'theme';

export const ChartButtonBox = styled(Box)`
  padding: 7px;
  background-color: ${colors.white};
  width: 130px;
  height: 130px;
  cursor: pointer;
  transition: 0.2s;
  border: 1px transparent solid;

  &:hover {
    border: 1px ${themeColors.secondary} solid;
  }
`;
