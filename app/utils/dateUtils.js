const MILISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

export const getUTCTime = (date) =>
  date.getTime() +
  date.getTimezoneOffset() * SECONDS_IN_MINUTE * MILISECONDS_IN_SECOND;

export const getDiffBetweenDatesInDays = (startDate, endDate) => {
  const diffTime = Math.abs(startDate - endDate);
  return Math.ceil(
    diffTime /
      (MILISECONDS_IN_SECOND *
        SECONDS_IN_MINUTE *
        MINUTES_IN_HOUR *
        HOURS_IN_DAY),
  );
};
