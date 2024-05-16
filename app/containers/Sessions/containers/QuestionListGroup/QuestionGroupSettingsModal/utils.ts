// Parse US time format to Date object
export const parseTime = (t: any) => {
  const d = new Date();
  const time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
  d.setHours(parseInt(time[1], 10) + (time[3] ? 12 : 0));
  d.setMinutes(parseInt(time[2], 10) || 0);
  return d;
};

// Get string representation of US time format from Date object
export const getTimeString = (date: any) => {
  const newTime = date.toLocaleTimeString('en-US');
  const amPm = newTime.split(' ')[1];
  const seconds = newTime.split(':')[2].replace(amPm, '');
  return newTime.replace(`:${seconds}`, ' ');
};
