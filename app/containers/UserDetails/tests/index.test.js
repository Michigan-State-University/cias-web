/**
 *
 * Tests for UserDetails
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { UserDetails } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<UserDetails />', () => {
  let props;
  const reducer = state => state;
  const initialState = {
    singleUser: {
      user: {
        id: '1',
        full_name: 'test test',
        roles: ['participant'],
        email: 'test@test.pl',
        avatar: null,
        firstName: 'test',
        lastName: 'test',
        active: true,
      },
    },
  };
  let store;
  let modalContainer;
  let mainAppContainer;
  beforeEach(() => {
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

    props = {
      userState: {
        user: {
          id: '1',
          full_name: 'test test',
          roles: ['participant'],
          email: 'test@test.pl',
          avatar: null,
          active: true,
        },
      },
      match: {
        params: {
          id: '1',
        },
      },
      fetchUser: jest.fn(),
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <UserDetails {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <UserDetails {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
