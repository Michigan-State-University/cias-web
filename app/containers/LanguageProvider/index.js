/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

// Those tags are handled by <Markup />
const errorsToOmit = ['INVALID_TAG', 'UNCLOSED_TAG'];

export const intlProviderConfig = {
  defaultRichTextElements: {
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
  },
  onError: (error) => {
    const showError = !errorsToOmit.some((errorToOmit) =>
      error.toString().includes(errorToOmit),
    );
    // eslint-disable-next-line no-console
    if (showError) console.error(error);
  },
};

export function LanguageProvider(props) {
  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale]}
      {...intlProviderConfig}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
