import React, { ReactElement } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import { VisibleWrapper } from 'components/VisibleWrapper';

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
  onSelectDay: (day: Dayjs) => void;
  MonthSelectorComponent?: ReactElement;
  month: number;
};

dayjs.extend(localeData);

export const TableCalendar = ({
  dates,
  selectedDay,
  onSelectDay,
  MonthSelectorComponent,
  month,
}: TableCalendarProps) => (
  <>
    <VisibleWrapper end="sm">{MonthSelectorComponent}</VisibleWrapper>
    <Container>
      <VisibleWrapper start="md">{MonthSelectorComponent}</VisibleWrapper>
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
  </>
);

export default TableCalendar;
