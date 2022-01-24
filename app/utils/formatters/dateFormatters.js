/**
 * Convert JS number month (0, 1, 2, ...) to translated name (January, February, March, ...)
 * @param locale
 * @return {Intl.DateTimeFormat}
 */
export const jsMonthToStringFormatter = (locale = 'en') =>
  new Intl.DateTimeFormat(locale, { month: 'long' });

export const fullDayToYearFormatter = 'DD-MM-YYYY';
export const firstDayOfMonthFormatter = 'D.MM';
