import dayjs, { Dayjs } from 'dayjs';
import chunk from 'lodash/chunk';

const weekLength = 7;

// Function that creates array of dates
const createDateArray = (
  arrayLength: number,
  year: number,
  month: number,
  offset: number = 0,
) =>
  new Array(arrayLength).fill(0).map((_v, i) => {
    const date = dayjs()
      .set('date', offset + i + 1)
      .year(year)
      .month(month);
    return date;
  });

export const getCalendarMonthDates = (startDate: Dayjs) => {
  // Month ago date
  const lastMonth = startDate.subtract(1, 'month');

  // Length of this month
  const len = startDate.daysInMonth();

  // Length of the previous month
  const prevLen = lastMonth.daysInMonth();

  // Previous month year
  const previousMonthYear = lastMonth.year();

  // Next month
  const nextMonth = startDate.add(1, 'month');

  // Next month year
  const nextMonthYear = nextMonth.year();

  const days = createDateArray(len, startDate.year(), startDate.month());

  // From which weekdays the month starts and ends
  const firstDayOfMonth = dayjs()
    .month(startDate.month())
    .startOf('month')
    .day();
  const lastDayOfMonth = dayjs().month(startDate.month()).endOf('month').day();

  // No of day in month with which we should start prev month
  const startingLastMonthDay = prevLen - firstDayOfMonth;

  // Number of days which should be added at the end
  // Minus one because in dayjs weekdays are counted from 0 (Sun)
  const lengthOfNextMonthDays = weekLength - lastDayOfMonth - 1;

  const previousMonthDays = createDateArray(
    firstDayOfMonth,
    previousMonthYear,
    lastMonth.month(),
    startingLastMonthDay,
  );

  const nextMonthDays = createDateArray(
    lengthOfNextMonthDays,
    nextMonthYear,
    nextMonth.month(),
  );

  const calendarSets = previousMonthDays.concat(days).concat(nextMonthDays);

  const dates = chunk(calendarSets, weekLength);

  return dates;
};
