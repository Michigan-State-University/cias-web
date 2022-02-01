import dayjs, { Dayjs } from 'dayjs';
import chunk from 'lodash/chunk';

const weekLength = 7;

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

  const days = new Array(len).fill(0).map((_v, i) => {
    const date = dayjs(startDate)
      .set('date', i + 1)
      .year(startDate.year())
      .month(startDate.month());
    return date;
  });

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

  const previousMonthDays = new Array(firstDayOfMonth).fill(0).map((_v, i) => {
    const date = dayjs(lastMonth)
      .set('date', startingLastMonthDay + i + 1)
      .year(previousMonthYear)
      .month(lastMonth.month());
    return date;
  });

  const nextMonthDays = new Array(lengthOfNextMonthDays)
    .fill(0)
    .map((_v, i) => {
      const date = dayjs(nextMonth)
        .set('date', i + 1)
        .year(nextMonthYear)
        .month(nextMonth.month());
      return date;
    });

  const calendarSets = previousMonthDays.concat(days).concat(nextMonthDays);

  const dates = chunk(calendarSets, weekLength);

  return dates;
};
