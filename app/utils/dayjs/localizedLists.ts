import dayjs from 'dayjs';

// Sets target locale globally only for the time of generating weekdaysShort
// then restores the previous locale
export const getLocalizedWeekdaysShort = (targetLocale?: string) => {
  const currentLocale = dayjs.locale();
  dayjs.locale(targetLocale);
  const weekdaysShort = dayjs.weekdaysShort();
  dayjs.locale(currentLocale);
  return weekdaysShort;
};
