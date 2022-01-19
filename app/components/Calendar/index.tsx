import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { getCalendarMonthDates } from 'utils/calendar/getCalendarMonth';

import TableCalendar from './TableCalendar';
import MonthSelector from './MonthSelector';

type CalendarProps = {
  startDate?: Dayjs;
};

export const Calendar = ({ startDate = dayjs() }: CalendarProps) => {
  const [monthDate, setMonthDate] = useState(startDate);
  const [selectedDay, setSelectedDay] = useState<Nullable<Dayjs>>(null);

  const dates = getCalendarMonthDates(monthDate);

  const MonthSelectorComponent = (
    <MonthSelector
      monthDate={monthDate}
      onSetMonth={setMonthDate}
      canGoNext
      canGoPrev
    />
  );

  return (
    <TableCalendar
      dates={dates}
      selectedDay={selectedDay}
      onSelectDay={setSelectedDay}
      MonthSelectorComponent={MonthSelectorComponent}
      month={monthDate.month()}
    />
  );
};

export default Calendar;
