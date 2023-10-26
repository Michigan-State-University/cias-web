import { createIntl, createIntlCache } from 'react-intl';

import {
  DEFAULT_LOCALE,
  isAppLanguageSupported,
  translationMessages,
} from 'i18n';
import { store } from 'configureStore';

import { intlProviderConfig } from 'containers/AppLanguageProvider';

const cache = createIntlCache();

const intl = (locale = DEFAULT_LOCALE) =>
  createIntl(
    {
      locale: isAppLanguageSupported(locale) ? locale : DEFAULT_LOCALE,
      messages: translationMessages[locale],
      ...intlProviderConfig,
    },
    cache,
  );

export const formatMessage = (...props) => {
  const locale = store.getState()?.language?.locale;
  return intl(locale).formatMessage(...props);
};

export const formatInterventionLanguageMessage = (...props) => {
  const locale = store.getState()?.intervention?.intervention?.languageCode;
  return intl(locale).formatMessage(...props);
};

export default intl;
