import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { Roles } from 'models/User/RolesManager';

import { interventionReducer } from 'global/reducers/intervention';

import { createTestStore } from 'utils/testUtils/storeUtils';

import { intlProviderConfig } from 'containers/AppLanguageProvider';

import InterventionDetailsPage from '../index';

describe('<InterventionDetailsPage />', () => {
  const defaultProps = {
    match: {
      params: {
        interventionId: '1jkajsd2-112a',
      },
    },
  };
  const initialState = { auth: { user: { roles: [Roles.Admin] } } };
  const store = createTestStore(initialState);

  beforeAll(() => {
    store.injectedReducers = {
      intervention: interventionReducer,
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
          <MemoryRouter>
            <InterventionDetailsPage {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render loader and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
        <Provider store={store}>
          <MemoryRouter>
            <InterventionDetailsPage {...defaultProps} />
          </MemoryRouter>
        </Provider>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
