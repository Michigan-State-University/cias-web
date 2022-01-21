import React, { useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useContainerQuery } from 'react-container-query';

import { getCalendarMonthDates } from 'utils/calendar/getCalendarMonth';
import { containerBreakpoints } from 'components/Container/containerBreakpoints';

import TableCalendar from './TableCalendar';
import MonthSelector from './MonthSelector';
import { Container } from './styled';

type CalendarProps = {
  startDate?: Dayjs;
};

const IS_DESKTOP = 'IS_DESKTOP';

const QUERY = {
  [IS_DESKTOP]: {
    minWidth: containerBreakpoints.md,
  },
};

export const Calendar = ({ startDate = dayjs() }: CalendarProps) => {
  const [monthDate, setMonthDate] = useState(startDate);
  const [selectedDay, setSelectedDay] = useState<Nullable<Dayjs>>(null);

  const dates = getCalendarMonthDates(monthDate);

  const [containerQueryParams, containerRef] = useContainerQuery(QUERY, {
    width: undefined,
    height: undefined,
  });

  const isDesktop = useMemo(
    () => containerQueryParams[IS_DESKTOP],
    [containerQueryParams],
  );

  const MonthSelectorComponent = (
    <MonthSelector
      monthDate={monthDate}
      onSetMonth={setMonthDate}
      canGoNext
      canGoPrev
    />
  );

  return (
    <Container mobile={!isDesktop} ref={containerRef}>
      <TableCalendar
        dates={dates}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        MonthSelectorComponent={MonthSelectorComponent}
        month={monthDate.month()}
        isMobile={!isDesktop}
      />
    </Container>
  );
};

export default Calendar;
