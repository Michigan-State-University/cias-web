/**
 *
 * Tests for UserList
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { UserListReducer } from 'global/reducers/userList';
import createModalForTests from 'utils/createModalForTests';
import { createTestStore } from 'utils/testUtils/storeUtils';

import UserList from '../index';

describe('<UserList />', () => {
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
  const store = createTestStore(initialState);

  beforeAll(() => {
    createModalForTests();
    store.injectedReducers = {
      userList: UserListReducer,
    };
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
