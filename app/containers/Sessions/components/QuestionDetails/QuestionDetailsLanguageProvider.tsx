import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { translationMessages } from 'i18n';

import { makeSelectInterventionLanguageCode } from 'global/reducers/intervention';

import {
  intlProviderConfig,
  makeSelectLocale,
} from 'containers/AppLanguageProvider';

export type Props = {
  children: ReactNode;
};

const QuestionDetailsLanguageProvider = (props: Props) => {
  const defaultLocale = useSelector(makeSelectLocale());
  const interventionLanguageCode = useSelector(
    makeSelectInterventionLanguageCode(),
  );
  const locale = interventionLanguageCode ?? defaultLocale;

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      // @ts-ignore
      messages={translationMessages[locale]}
      {...intlProviderConfig}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
};

export default QuestionDetailsLanguageProvider;
