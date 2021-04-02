import { createIntl, createIntlCache } from 'react-intl';

import { DEFAULT_LOCALE, translationMessages } from 'i18n';
import { intlProviderConfig } from 'containers/LanguageProvider';

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: DEFAULT_LOCALE,
    messages: translationMessages,
    ...intlProviderConfig,
  },
  cache,
);

const { formatMessage } = intl;

export default intl;

export { formatMessage };
