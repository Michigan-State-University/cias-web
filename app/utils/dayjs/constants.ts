import { ExtendedRelativeTimeConfig } from './types';

export enum CustomDayjsLocale {
  EN_SHORT_RELATIVE_TIME = 'en_short_relative_time',
  EN_LONG_RELATIVE_TIME = 'en_long_relative_time',
  EN_LONG_RELATIVE_TIME_WITH_SECONDS = 'en_long_relative_time_with_seconds',
}

export const CustomLocalesConfig: Record<
  CustomDayjsLocale,
  Omit<ILocale, 'name' | 'relativeTime'> & {
    relativeTime: ExtendedRelativeTimeConfig;
  }
> = {
  [CustomDayjsLocale.EN_SHORT_RELATIVE_TIME]: {
    formats: {},
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '<1m',
      ss: '<1m',
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
      past: '%s ago',
      s: '<1 min',
      ss: '<1 min',
      m: '1 min',
      mm: '%d mins',
      h: '1 hr',
      hh: '%d hrs',
      d: '1 day',
      dd: '%d days',
      M: '1 mth',
      MM: '%d mths',
      y: '1 year',
      yy: '%d years',
    },
  },
  [CustomDayjsLocale.EN_LONG_RELATIVE_TIME_WITH_SECONDS]: {
    formats: {},
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '1 sec',
      ss: '%d secs',
      m: '1 min',
      mm: '%d mins',
      h: '1 hr',
      hh: '%d hrs',
      d: '1 day',
      dd: '%d days',
      M: '1 mth',
      MM: '%d mths',
      y: '1 year',
      yy: '%d years',
    },
  },
};

export const RELATIVE_TIME_OPTIONS = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'ss', r: 59, d: 'second' },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y' },
    { l: 'yy', d: 'year' },
  ],
};

export const FILE_GENERATION_TIME_FORMAT = 'YYYY/MM/DD HH:mm';
