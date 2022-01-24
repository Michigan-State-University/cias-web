import styled from 'styled-components';
import { colors } from 'theme';
import Color from 'color';

export const Container = styled.div`
  background-color: ${colors.white};
  box-shadow: 0px 4px 20px ${colors.selago};
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  height: 100%;

  ${({ mobile }) =>
    mobile &&
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

  ${({ mobile }) =>
    mobile &&
    `
      text-align: center;

      & > th {
        padding-bottom: 16px;
      }
  `}
`;

export const CalendarRow = styled.tr`
  td {
    ${({ mobile, rowsNumber }) =>
      !mobile &&
      `
        height: calc(470px / ${rowsNumber});
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
