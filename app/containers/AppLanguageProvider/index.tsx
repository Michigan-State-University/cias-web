/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { IntlConfig } from '@formatjs/intl/src/types';

import { themeColors } from 'theme';

import { DEFAULT_LOCALE } from 'i18n';

import { makeSelectLocale } from './selectors';

// Those tags are handled by <Markup />
const errorsToOmit = ['INVALID_TAG', 'UNCLOSED_TAG'];

type AppIntlConfig = IntlConfig<React.ReactNode>;

export const intlProviderConfig: Pick<
  AppIntlConfig,
  'defaultRichTextElements' | 'onError'
> = {
  defaultRichTextElements: {
    space: (chunks) => (
      <>
        {'\u2000'}
        {chunks}
      </>
    ),
    bold: (chunks) => <b>{chunks}</b>,
    medium: (chunks) => <span style={{ fontWeight: 500 }}>{chunks}</span>,
    span: (chunks) => `<span>${chunks}</span>`,
    p: (chunks) => `<p>${chunks}</p>`,
    b: (chunks) => `<b>${chunks}</b>`,
    h1: (chunks) => `<h1>${chunks}</h1>`,
    h2: (chunks) => `<h2>${chunks}</h2>`,
    h3: (chunks) => `<h3>${chunks}</h3>`,
    ol: (chunks) => `<ol>${chunks}</ol>`,
    ul: (chunks) => `<ul>${chunks}</ul>`,
    li: (chunks) => `<li>${chunks}</li>`,
    sup: (chunks) => `<sup>${chunks}</sup>`,
    br: () => `<br />`,
    secondaryColorBold: (chunks) => (
      <span style={{ color: themeColors.secondary, fontWeight: 'bold' }}>
        {chunks}
      </span>
    ),
    primaryColorBold: (chunks) => (
      <span style={{ color: themeColors.primary, fontWeight: 'bold' }}>
        {chunks}
      </span>
    ),
    textColorBold: (chunks) => (
      <span style={{ color: themeColors.text, fontWeight: 'bold' }}>
        {chunks}
      </span>
    ),
    primaryColor: (chunks) => (
      <span style={{ color: themeColors.primary }}>{chunks}</span>
    ),
    warningColor: (chunks) => (
      <span style={{ color: themeColors.warning }}>{chunks}</span>
    ),
    phone: (chunks) => (
      <a
        href={`tel:${chunks}`}
        style={{ color: themeColors.primary, fontWeight: 500 }}
      >
        {chunks}
      </a>
    ),
  },
  onError: (error) => {
    const showError = !errorsToOmit.some((errorToOmit) =>
      error.toString().includes(errorToOmit),
    );
    // eslint-disable-next-line no-console
    if (showError) console.error(error);
  },
};

export type Props = {
  messages: Record<string, AppIntlConfig['messages']>;
  children: ReactNode;
};

const AppLanguageProvider = (props: Props) => {
  const locale = useSelector(makeSelectLocale());

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
      key={locale}
      messages={props.messages[locale]}
      {...intlProviderConfig}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
};

export default AppLanguageProvider;
export { makeSelectLocale };
