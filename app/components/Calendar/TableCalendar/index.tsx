import React, { memo, ReactElement } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { CalendarData } from 'models/Tlfb';
import { fullDayToYearFormatter } from 'utils/formatters';

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
  disableManualDayClick?: boolean;
  orderedGroupNames: string[];
};

// prevent rerender

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
  disableManualDayClick,
  orderedGroupNames,
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
                  const formattedDate = dayjs(day).format(
                    fullDayToYearFormatter,
                  );

                  return (
                    <td key={day.toISOString()}>
                      <Day
                        rowsNumber={dates.length}
                        onClick={onSelectDay}
                        active={selectedDay?.isSame(day, 'day')}
                        day={day}
                        unreachable={day.month() !== month}
                        compact={!isDesktop}
                        disabled={
                          day.isAfter(endDate, 'day') ||
                          day.isBefore(startDate, 'day')
                        }
                        disableManualDayClick={disableManualDayClick}
                        dayData={calendarData[formattedDate]}
                        orderedGroupNames={orderedGroupNames}
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

export default memo(TableCalendar);
