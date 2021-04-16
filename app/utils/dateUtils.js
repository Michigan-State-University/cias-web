const MILISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

export const getUTCTime = date =>
  date.getTime() +
  date.getTimezoneOffset() * SECONDS_IN_MINUTE * MILISECONDS_IN_SECOND;
