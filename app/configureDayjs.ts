import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const configureDayjs = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localeData);
  dayjs.extend(customParseFormat);
};

export default configureDayjs;
