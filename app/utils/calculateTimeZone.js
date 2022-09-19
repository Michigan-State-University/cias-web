import { loadState } from 'utils/persist';
import dayjs from 'dayjs';

/**
 * Default UTC time when the server will perform the operation of sending e-mails
 */
const DEFAULT_TIME = dayjs().utc().hour(10).minute(0).second(0);

/**
 * @param {object} utcTime dayjs object, determines the time in the user's time zone
 * @returns {string} calculated time
 */
const calculateTimeZone = (utcTime = DEFAULT_TIME) => {
  const { timeZone } = loadState() || {};
  let utcMoment = utcTime;
  if (timeZone) utcMoment = utcMoment.tz(timeZone);
  return utcMoment.format('hh:mm a');
};

export default calculateTimeZone;
