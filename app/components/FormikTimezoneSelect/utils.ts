import dayjs from 'dayjs';

export const getTimezoneLabel = (timeZone: string) =>
  `${timeZone} (UTC ${dayjs().tz(timeZone).format('Z')})`;
