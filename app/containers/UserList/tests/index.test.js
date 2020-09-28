/**
 *
 * Tests for UserList
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';

import createModalForTests from 'utils/createModalForTests';
import { UserListReducer } from 'global/reducers/userList';

import UserList from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<UserList />', () => {
  const reducer = state => state;
  const initialState = {
    userList: {
      users: [
        {
          id: 's2as-321',
          full_name: 'test',
          roles: ['participant'],
          email: 'test@test.pl',
          active: true,
        },
        {
          id: 's2as-3212',
          full_name: 'test2',
          roles: ['researcher'],
          email: 'test2@test.pl',
          active: true,
        },
        {
          id: 's22as-32321',
          full_name: 'test3',
          roles: ['admin'],
          email: 'test3@test.pl',
          active: true,
        },
      ],
    },
  };
  let store;
  beforeAll(() => {
    createModalForTests();
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {
      userList: UserListReducer,
    };
    store.injectedSagas = {};
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <UserList />
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
            <UserList />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
