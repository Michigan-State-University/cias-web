/**
 *
 * Tests for AccountSettings
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

import AccountSettings from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<AccountSettings />', () => {
  let store;

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
  const reducer = state => state;

  let modalContainer;
  let mainAppContainer;

  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};

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
