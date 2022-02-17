import React, { ReactElement } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { CalendarData } from '../types';

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
  isDesktop: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
  calendarData: CalendarData;
};

export const TableCalendar = ({
  dates,
  selectedDay,
  onSelectDay,
  MonthSelectorComponent,
  month,
  isDesktop,
  startDate,
  endDate,
  calendarData,
}: TableCalendarProps) => (
  <>
    {!isDesktop && MonthSelectorComponent}
    <Container isDesktop={isDesktop}>
      {isDesktop && MonthSelectorComponent}
      <CalendarTable>
        <thead>
          <CalendarHeader isDesktop={isDesktop}>
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
                isDesktop={isDesktop}
              >
                {week.map((day) => {
                  const formattedDate = dayjs(day).format('DD-MM-YYYY');
                  return (
                    <td key={day.toISOString()}>
                      <Day
                        rowsNumber={dates.length}
                        events={calendarData[formattedDate]?.events ?? []}
                        onClick={(dayId) => onSelectDay(day, dayId)}
                        active={selectedDay?.isSame(day, 'day')}
                        day={day}
                        unreachable={day.month() !== month}
                        compact={!isDesktop}
                        disabled={
                          day.isAfter(endDate) || day.isBefore(startDate)
                        }
                      />
                    </td>
                  );
                })}
              </CalendarRow>
            ))}
        </tbody>
      </CalendarTable>
    </Container>
  </>
);

export default TableCalendar;
