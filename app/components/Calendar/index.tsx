import React, { useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useContainerQuery } from 'react-container-query';

import { getCalendarMonthDates } from 'utils/calendar/getCalendarMonth';
import { containerBreakpoints } from 'components/Container/containerBreakpoints';
import Divider from 'components/Divider';

import TableCalendar from './TableCalendar';
import MonthSelector from './MonthSelector';
import { Container } from './styled';

type CalendarProps = {
  startDate?: Dayjs;
  endDate?: Dayjs;
  selectedDay?: Dayjs;
  onSelectDay?: (day: Dayjs, id: string) => void;
};

const IS_DESKTOP = 'IS_DESKTOP';

const QUERY = {
  [IS_DESKTOP]: {
    minWidth: containerBreakpoints.md,
  },
};

export const Calendar = ({
  startDate = dayjs(),
  endDate = dayjs(),
  selectedDay,
  onSelectDay,
}: CalendarProps) => {
  const [monthDate, setMonthDate] = useState(endDate);

  const handleSelectDay = (day: Dayjs, id: string) => {
    if (onSelectDay) onSelectDay(day, id);
  };

  const dates = getCalendarMonthDates(monthDate);

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
    />
  );

  return (
    <>
      {!isDesktop && <Divider mb={32} mt={-8} />}
      <Container mobile={!isDesktop} ref={containerRef}>
        <TableCalendar
          dates={dates}
          selectedDay={selectedDay}
          onSelectDay={handleSelectDay}
          MonthSelectorComponent={MonthSelectorComponent}
          month={monthDate.month()}
          isMobile={!isDesktop}
          startDate={startDate}
          endDate={endDate}
        />
      </Container>
    </>
  );
};

export default Calendar;
