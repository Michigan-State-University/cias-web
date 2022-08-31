import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { DEFAULT_LOCALE } from 'i18n';

import { CustomLocalesConfig } from './constants';

export const configureDayjs = () => {
  // Load plugins
  dayjs.extend(relativeTime);

  // Create custom locales
  Object.entries(CustomLocalesConfig).forEach(([localeName, config]) => {
    dayjs.locale(localeName, {
      name: localeName,
      ...config,
    });
  });

  dayjs.locale(DEFAULT_LOCALE);
};
