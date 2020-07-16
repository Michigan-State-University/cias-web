import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE, translationMessages } from 'i18n';

const { intl } = new IntlProvider(
  { locale: DEFAULT_LOCALE, messages: translationMessages },
  {},
).getChildContext();

const { formatMessage } = intl;

export default intl;

export { formatMessage };
