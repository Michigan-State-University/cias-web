import styled from 'styled-components';
import { colors } from 'theme';
import Color from 'color';

import { CALENDAR_HEIGHT } from '../constants';

export const Container = styled.div`
  background-color: ${colors.white};
  box-shadow: 0 4px 20px ${colors.selago};
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  height: 100%;

  ${({ isDesktop }) =>
    !isDesktop &&
    `
      height: auto;
    `}
`;

export const CalendarTable = styled.table`
  width: 100%;
  table-layout: fixed;
`;

export const CalendarHeader = styled.tr`
  text-align: left;
  font-size: 13px;
  color: ${Color(colors.bluewood).alpha(0.5).rgb().string()};

  & > th {
    font-weight: normal;
    padding-bottom: 8px;
  }

  ${({ isDesktop }) =>
    !isDesktop &&
    `
      text-align: center;

      & > th {
        padding-bottom: 16px;
      }
  `}
`;

export const CalendarRow = styled.tr`
  td {
    ${({ isDesktop, rowsNumber }) =>
      isDesktop &&
      `
        height: calc((${CALENDAR_HEIGHT} - 130px) / ${rowsNumber});
    `}
  }

  & > td {
    padding: 0 2px;
  }

  &:not(:last-of-type) {
    & > td {
      padding-bottom: 4px;
    }
  }
`;
