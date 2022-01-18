import React from 'react';
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
  month: number;
  selectedDay: Nullable<Dayjs>;
  onSelectDay: (day: Dayjs) => void;
};

dayjs.extend(localeData);

export const TableCalendar = ({
  dates,
  month,
  selectedDay,
  onSelectDay,
}: TableCalendarProps) => (
  <Container>
    <CalendarTable>
      <thead>
        <CalendarHeader>
          {dayjs.weekdaysShort().map((weekday: string) => (
            <th key={weekday}>{weekday}</th>
          ))}
        </CalendarHeader>
      </thead>
      <tbody>
        {dates &&
          dates.map((week, index) => (
            <CalendarRow key={`week-${index}`}>
              {week.map((day) => (
                <td key={day.toISOString()}>
                  <Day
                    onClick={() => onSelectDay(day)}
                    active={selectedDay?.isSame(day, 'day')}
                    day={dayjs(day).date()}
                    unreachable={dayjs(day).month() !== month}
                  />
                </td>
              ))}
            </CalendarRow>
          ))}
      </tbody>
    </CalendarTable>
  </Container>
);

export default TableCalendar;
