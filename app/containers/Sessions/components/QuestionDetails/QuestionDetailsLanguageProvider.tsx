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
  keepAppLocale?: boolean;
};

const QuestionDetailsLanguageProvider = ({
  children,
  keepAppLocale,
}: Props) => {
  const appLocale = useSelector(makeSelectLocale());
  const interventionLanguageCode = useSelector(
    makeSelectInterventionLanguageCode(),
  );

  const locale =
    !keepAppLocale && interventionLanguageCode
      ? interventionLanguageCode
      : appLocale;

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={appLocale}
      // @ts-ignore
      messages={translationMessages[locale]}
      {...intlProviderConfig}
    >
      {React.Children.only(children)}
    </IntlProvider>
  );
};

export default QuestionDetailsLanguageProvider;
