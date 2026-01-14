import { get } from 'lodash';

// Parse US time format to Date object
export const parseTime = (t: string) => {
  if (!t) {
    return null;
  }
  const d = new Date();
  const time = t.match(/(\d+)(?::(\d\d))?\s*([Pp]?)/);
  const minutes = parseInt(get(time, '[2]', '0'), 10);
  const ampm = get(time, '[3]');
  let hours = parseInt(get(time, '[1]', '0'), 10);
  if (hours === 12 && !ampm) {
    hours = 0;
  } else {
    hours += hours < 12 && ampm ? 12 : 0;
  }
  d.setHours(hours);
  d.setMinutes(minutes || 0);
  return d;
};

// Get string representation of US time format from Date object
export const getTimeString = (date: Date | null) => {
  const newTime = date ? date.toLocaleTimeString('en-US') : '';
  const amPm = newTime.split(' ')[1];
  const seconds = newTime.split(':')[2].replace(amPm, '');
  return newTime.replace(`:${seconds}`, ' ');
};

export const parseTime24 = (t: string) => {
  if (!t) {
    return null;
  }
  const d = new Date();
  const time = t.match(/(\d+):(\d\d)/);
  if (!time) {
    return null;
  }
  const hours = parseInt(time[1], 10);
  const minutes = parseInt(time[2], 10);
  d.setHours(hours);
  d.setMinutes(minutes);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
};

export const getTimeString24 = (date: Date | null) => {
  if (!date) {
    return '';
  }
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
