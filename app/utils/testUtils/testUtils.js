import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

const ProviderWrapper = ({ children }) => (
  <IntlProvider locale={DEFAULT_LOCALE}>{children}</IntlProvider>
);

const testRender = (ui, options) =>
  render(ui, { wrapper: ProviderWrapper, ...options });

export { testRender };

ProviderWrapper.propTypes = {
  children: PropTypes.node,
};
