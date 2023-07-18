/**
 *
 * Tests for InterventionPage
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { Roles } from 'models/User/RolesManager';

import { createTestStore } from 'utils/testUtils/storeUtils';

import { DEFAULT_LOCALE } from 'i18n';

import { intlProviderConfig } from 'containers/LanguageProvider';

import InterventionPage from '../index';

describe('<InterventionPage />', () => {
  let store;
  let modalContainer;
  let mainAppContainer;
  const initialState = {
    auth: {
      user: {
        roles: [Roles.Admin],
      },
    },
    interventions: {
      interventions: [],
      loaders: {
        fetchInterventions: true,
      },
      errors: {
        fetchInterventions: null,
      },
    },
  };

  beforeAll(() => {
    store = createTestStore(initialState);
    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);

    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
          <MemoryRouter>
            <InterventionPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot with loader', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
          <MemoryRouter>
            <InterventionPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot without interventions', () => {
    store = createTestStore({
      ...initialState,
      interventions: {
        interventions: [],
        loaders: {
          fetchInterventions: false,
        },
        errors: {
          fetchInterventions: null,
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
          <MemoryRouter>
            <InterventionPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot with interventions', () => {
    store = createTestStore({
      ...initialState,
      interventions: {
        interventions: [
          {
            name: 'Name',
            status: 'draft',
            sessions_size: 2,
            user: { id: 'test' },
          },
        ],
        loaders: {
          fetchInterventions: false,
        },
        errors: {
          fetchInterventions: null,
        },
      },
    });
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
          <MemoryRouter>
            <InterventionPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
