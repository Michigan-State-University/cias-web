/**
 *
 * Tests for SettingsPanel
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';

import { intlProviderConfig } from 'containers/LanguageProvider';

import SettingsPanel from '../index';

describe('<SettingsPanel />', () => {
  const intervention = {
    name: 'Name of the session',
    id: 'as120s-as12cs',
    sharedTo: 'anyone',
  };

  const initialState = {
    intervention: {
      intervention,
      loaders: {
        fetchInterventionLoading: false,
      },
      errors: {
        fetchInterventionError: null,
      },
    },
  };
  const store = createTestStore(initialState);

  const defaultProps = {
    intervention,
    match: { params: { intervention: { id: 'as120s-as12cs' } } },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
            <SettingsPanel {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
            <SettingsPanel {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
