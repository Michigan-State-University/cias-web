import React, { ReactElement } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import {
  Container,
  CalendarTable,
  CalendarHeader,
  CalendarRow,
} from './styled';

import Day from '../Day';

type TableCalendarProps = {
  dates: Dayjs[][];
  selectedDay: Nullable<Dayjs>;
  onSelectDay: (day: Dayjs, id: string) => void;
  MonthSelectorComponent?: ReactElement;
  month: number;
  isMobile: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
};

dayjs.extend(localeData);

export const TableCalendar = ({
  dates,
  selectedDay,
  onSelectDay,
  MonthSelectorComponent,
  month,
  isMobile,
  startDate,
  endDate,
}: TableCalendarProps) => (
  <>
    {isMobile && MonthSelectorComponent}
    <Container mobile={isMobile}>
      {!isMobile && MonthSelectorComponent}
      <CalendarTable>
        <thead>
          <CalendarHeader mobile={isMobile}>
            {dayjs.weekdaysShort().map((weekday: string) => (
              <th key={weekday}>{weekday}</th>
            ))}
          </CalendarHeader>
        </thead>
        <tbody>
          {dates &&
            dates.map((week, index) => (
              <CalendarRow
                key={`week-${index}`}
                rowsNumber={dates.length}
                mobile={isMobile}
              >
                {week.map((day) => (
                  <td key={day.toISOString()}>
                    <Day
                      onClick={(dayId) => onSelectDay(day, dayId)}
                      active={selectedDay?.isSame(day, 'day')}
                      day={day}
                      unreachable={day.month() !== month}
                      mobile={isMobile}
                      disabled={day.isAfter(endDate) || day.isBefore(startDate)}
                    />
                  </td>
                ))}
              </CalendarRow>
            ))}
        </tbody>
      </CalendarTable>
    </Container>
  </>
);

export default TableCalendar;
