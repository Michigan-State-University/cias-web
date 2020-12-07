import styled from 'styled-components';

import Box from 'components/Box';
import { themeColors } from 'theme';
import { layout, padding } from 'components/BaseComponentStyles';
import Column from 'components/Column';

import { maxQueries } from 'components/Container/mediaQuery';

export const StyledBox = styled(Box)`
  min-height: 55px;
  width: 100%;
  ${padding}
`;

export const SessionDivider = styled.hr`
  display: block;
  height: 0;
  border: 0;
  padding: 0;
  border-top: 1px solid ${themeColors.highlight};
  ${layout}
`;

export const NotificationColumn = styled(Column)`
  @media ${maxQueries.sm} {
    align-items: flex-start;
    margin-top: 20px;
  }
`;
