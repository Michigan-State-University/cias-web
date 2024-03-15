import React, {
  useState,
  useMemo,
  memo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useContainerQuery } from 'react-container-query';

import { CalendarData } from 'models/Tlfb';
import { getCalendarMonthDates } from 'utils/calendar/getCalendarMonth';

import { containerBreakpoints } from 'components/Container/containerBreakpoints';
import Divider from 'components/Divider';

import TableCalendar from './TableCalendar';
import MonthSelector from './MonthSelector';
import { Container } from './styled';
import { CalendarRef } from './types';

type CalendarProps = {
  startDate?: Dayjs;
  endDate?: Dayjs;
  selectedDay?: Dayjs;
  onSelectDay?: (day: Dayjs, id: string) => void;
  calendarData: CalendarData;
  disableManualDayClick?: boolean;
  orderedGroupNames: string[];
  language: string;
};

const IS_DESKTOP = 'IS_DESKTOP';

const QUERY = {
  [IS_DESKTOP]: {
    minWidth: containerBreakpoints.md,
  },
};

export const Calendar = forwardRef<CalendarRef, CalendarProps>(
  (
    {
      startDate = dayjs(),
      endDate = dayjs(),
      selectedDay,
      onSelectDay,
      calendarData,
      disableManualDayClick = false,
      orderedGroupNames,
      language,
    }: CalendarProps,
    ref,
  ) => {
    const [monthDate, setMonthDate] = useState(endDate);
    useImperativeHandle(ref, () => ({
      setMonth: setMonthDate,
    }));

    const handleSelectDay = useCallback(
      (day: Dayjs, id: string) => {
        if (onSelectDay) onSelectDay(day, id);
      },
      [!!onSelectDay],
    );

    const dates = useMemo(() => getCalendarMonthDates(monthDate), [monthDate]);

    const [containerQueryParams, containerRef] = useContainerQuery(QUERY, {
      width: undefined,
      height: undefined,
    });

    const isDesktop = useMemo(
      () => containerQueryParams[IS_DESKTOP],
      [containerQueryParams],
    );

    const isNotLastMonth = monthDate.endOf('M').isBefore(endDate);
    const isNotFirstMonth = monthDate.isAfter(startDate.endOf('M'));

    const MonthSelectorComponent = (
      <MonthSelector
        monthDate={monthDate}
        onSetMonth={setMonthDate}
        canGoNext={isNotLastMonth}
        canGoPrev={isNotFirstMonth}
        disabled={disableManualDayClick}
        language={language}
      />
    );

    return (
      <>
        {!isDesktop && <Divider mb={32} mt={-8} />}
        <Container isDesktop={isDesktop} ref={containerRef}>
          <TableCalendar
            dates={dates}
            selectedDay={selectedDay}
            onSelectDay={handleSelectDay}
            MonthSelectorComponent={MonthSelectorComponent}
            month={monthDate.month()}
            isDesktop={isDesktop}
            startDate={startDate}
            endDate={endDate}
            calendarData={calendarData}
            disableManualDayClick={disableManualDayClick}
            orderedGroupNames={orderedGroupNames}
            language={language}
          />
        </Container>
      </>
    );
  },
);

export default memo(Calendar);
