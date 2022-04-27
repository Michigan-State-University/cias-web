import React, { memo, ReactElement } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import countBy from 'lodash/countBy';
import toInteger from 'lodash/toInteger';

import { EventData, CalendarData } from 'models/Tlfb';
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
};

// prevent rerender
const EMPTY_ARRAY: EventData[] = [];

const getCountOfConsumedSubstances = (
  hasConsumedSubstances: boolean,
  hasNoSubstancesListed: boolean,
  numberOfSubstancesConsumed: number,
) => {
  if (hasConsumedSubstances && hasNoSubstancesListed) return true;
  if (hasConsumedSubstances && !hasNoSubstancesListed)
    return numberOfSubstancesConsumed;
  return 0;
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
  disableManualDayClick,
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

                  const consumptions =
                    calendarData[formattedDate]?.answer?.body?.consumptions;

                  const substancesConsumed =
                    calendarData[formattedDate]?.answer?.body
                      ?.substancesConsumed;

                  const numberOfSubstancesConsumed =
                    countBy(
                      consumptions,
                      (substance) =>
                        substance.consumed || !!toInteger(substance.amount),
                    ).true || 0;

                  const substanceCount = getCountOfConsumedSubstances(
                    !!substancesConsumed,
                    consumptions?.length === 0,
                    numberOfSubstancesConsumed,
                  );

                  return (
                    <td key={day.toISOString()}>
                      <Day
                        rowsNumber={dates.length}
                        events={
                          calendarData[formattedDate]?.events ?? EMPTY_ARRAY
                        }
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
                        substanceCount={
                          calendarData[formattedDate]?.answer
                            ? substanceCount
                            : undefined
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

export default memo(TableCalendar);
