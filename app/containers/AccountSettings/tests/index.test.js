/**
 *
 * Tests for AccountSettings
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';

import AccountSettings from '../index';

describe('<AccountSettings />', () => {
  const initialState = {
    auth: {
      user: {
        id: '85d1c37e-b921-4eaa-8ad6-0f255c4ecdc5',
        firstName: 'Name',
        lastName: 'Surname',
        email: 'admin@cias-api.herokuapp.com',
        timeZone: 'America/New_York',
      },
      errors: {
        changePasswordError: null,
        changeEmailError: null,
      },
      loaders: {
        changePasswordLoading: false,
        changeEmailLoading: null,
      },
      cache: {
        user: {
          id: '85d1c37e-b921-4eaa-8ad6-0f255c4ecdc5',
          firstName: 'Name',
          lastName: 'Surname',
          email: 'admin@cias-api.herokuapp.com',
        },
      },
    },
  };

  let modalContainer;
  let mainAppContainer;

  const store = createTestStore(initialState);
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <AccountSettings dispatch={dispatch} />
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
          <IntlProvider locale={DEFAULT_LOCALE}>
            <AccountSettings />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
