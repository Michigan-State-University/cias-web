import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import minMax from 'dayjs/plugin/minMax';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import objectSupport from 'dayjs/plugin/objectSupport';

import { DEFAULT_LOCALE, appLocales } from 'i18n';

import { CustomLocalesConfig, RELATIVE_TIME_OPTIONS } from './constants';

appLocales.forEach((locale) => {
  try {
    // See dayjs docs https://day.js.org/docs/en/i18n/i18n for a list of supported languages
    // eslint-disable-next-line global-require
    require(`dayjs/locale/${locale}.js`);
    // eslint-disable-next-line no-empty
  } catch {}
});

export const configureDayjs = () => {
  // Load plugins
  dayjs.extend(relativeTime, RELATIVE_TIME_OPTIONS);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localeData);
  dayjs.extend(customParseFormat);
  dayjs.extend(minMax);
  dayjs.extend(advancedFormat);
  dayjs.extend(localizedFormat);
  dayjs.extend(objectSupport);

  // Create custom locales
  Object.entries(CustomLocalesConfig).forEach(([localeName, config]) => {
    dayjs.locale(localeName, {
      name: localeName,
      ...config,
    });
  });

  dayjs.locale(DEFAULT_LOCALE);
};
