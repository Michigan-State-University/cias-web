import { get } from 'lodash';

// Parse US time format to Date object
export const parseTime = (t: string) => {
  if (!t) {
    return null;
  }
  const d = new Date();
  const time = t.match(/(\d+)(?::(\d\d))?\s*([Pp]?)/);
  const hours = get(time, '[1]');
  const minutes = get(time, '[2]');
  const ampm = get(time, '[3]');
  d.setHours(parseInt(hours, 10) + (ampm ? 12 : 0));
  d.setMinutes(parseInt(minutes, 10) || 0);
  return d;
};

// Get string representation of US time format from Date object
export const getTimeString = (date: Date | null) => {
  const newTime = date ? date.toLocaleTimeString('en-US') : '';
  const amPm = newTime.split(' ')[1];
  const seconds = newTime.split(':')[2].replace(amPm, '');
  return newTime.replace(`:${seconds}`, ' ');
};
