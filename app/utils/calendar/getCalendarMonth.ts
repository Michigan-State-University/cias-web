import dayjs, { Dayjs } from 'dayjs';
import chunk from 'lodash/chunk';

const weekLength = 7;

// Function that creates array of dates
const createDateArray = (
  baseDate: Dayjs,
  arrayLength: number,
  offset: number = 0,
) =>
  new Array(arrayLength).fill(0).map((_v, i) => {
    const date = dayjs(baseDate)
      .set('date', offset + i + 1)
      .year(baseDate.year())
      .month(baseDate.month());
    return date;
  });

export const getCalendarMonthDates = (startDate: Dayjs) => {
  // Month ago date
  const lastMonth = startDate.subtract(1, 'month');

  // Length of this month
  const len = startDate.daysInMonth();

  // Length of the previous month
  const prevLen = lastMonth.daysInMonth();

  // Next month
  const nextMonth = startDate.add(1, 'month');

  const days = createDateArray(startDate, len);

  // From which weekdays the month starts and ends
  const firstDayOfMonth = dayjs()
    .month(startDate.month())
    .year(startDate.year())
    .startOf('month')
    .day();

  const lastDayOfMonth = dayjs()
    .month(startDate.month())
    .year(startDate.year())
    .endOf('month')
    .day();

  // No of day in month with which we should start prev month
  const startingLastMonthDay = prevLen - firstDayOfMonth;

  // Number of days which should be added at the end
  // Minus one because in dayjs weekdays are counted from 0 (Sun)
  const lengthOfNextMonthDays = weekLength - lastDayOfMonth - 1;

  const previousMonthDays = createDateArray(
    lastMonth,
    firstDayOfMonth,
    startingLastMonthDay,
  );

  const nextMonthDays = createDateArray(nextMonth, lengthOfNextMonthDays);

  const calendarSets = previousMonthDays.concat(days).concat(nextMonthDays);

  const dates = chunk(calendarSets, weekLength);

  return dates;
};
