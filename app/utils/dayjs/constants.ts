export enum CustomDayjsLocale {
  EN_SHORT_RELATIVE_TIME = 'en_short_relative_time',
  EN_LONG_RELATIVE_TIME = 'en_long_relative_time',
}

export const CustomLocalesConfig: Record<
  CustomDayjsLocale,
  Omit<ILocale, 'name'>
> = {
  [CustomDayjsLocale.EN_SHORT_RELATIVE_TIME]: {
    formats: {},
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '<1m',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1mo',
      MM: '%dmo',
      y: '1y',
      yy: '%dy',
    },
  },
  [CustomDayjsLocale.EN_LONG_RELATIVE_TIME]: {
    formats: {},
    relativeTime: {
      future: 'in %s',
      past: '% sec ago',
      s: '<1 min ago',
      m: '1 min ago',
      mm: '%d mins ago',
      h: '1 hr ago',
      hh: '%d hrs ago',
      d: '1 day ago',
      dd: '%d days ago',
      M: '1 mth ago',
      MM: '%d mths ago',
      y: '1 year ago',
      yy: '%d years ago',
    },
  },
};

export const FILE_GENERATION_TIME_FORMAT = 'YYYY/MM/DD HH:mm';
