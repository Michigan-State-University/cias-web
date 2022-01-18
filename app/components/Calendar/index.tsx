import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { getCalendarMonthDates } from 'utils/calendar/getCalendarMonth';

import TableCalendar from './TableCalendar';

type CalendarProps = {
  startDate?: Dayjs;
};

export const Calendar = ({ startDate = dayjs() }: CalendarProps) => {
  const dates = getCalendarMonthDates(startDate);
  const month = startDate.month();

  const [selectedDay, setSelectedDay] = useState<Nullable<Dayjs>>(null);

  return (
    <TableCalendar
      dates={dates}
      month={month}
      selectedDay={selectedDay}
      onSelectDay={setSelectedDay}
    />
  );
};

export default Calendar;
