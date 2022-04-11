/**
 *
 * Tests for UserList
 *
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { Roles } from 'models/User/UserRoles';
import { UserListReducer } from 'global/reducers/userList';
import createModalForTests from 'utils/createModalForTests';
import { createTestStore } from 'utils/testUtils/storeUtils';

import UserList from '../index';
import messages from '../messages';

describe('<UserList />', () => {
  const initialState = (role) => ({
    auth: {
      user: { firstName: 'test', lastName: 'test', roles: [role] },
    },
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
  });
  const storeAdmin = createTestStore(initialState(Roles.admin));
  const storeResearcher = createTestStore(initialState(Roles.researcher));

  beforeAll(() => {
    createModalForTests();
    storeAdmin.injectedReducers = {
      userList: UserListReducer,
    };
    storeResearcher.injectedReducers = {
      userList: UserListReducer,
    };
  });

  it('Expect to not log errors in console - admin', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={storeAdmin}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <UserList />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to not log errors in console - researcher', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={storeResearcher}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <UserList />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot - researcher', () => {
    const { container } = render(
      <Provider store={storeResearcher}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <UserList />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );

    const inviteButton = screen.queryByText(
      messages.inviteResearcher.defaultMessage,
    );
    expect(inviteButton).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot - admin', () => {
    const { container } = render(
      <Provider store={storeAdmin}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <UserList />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    const inviteButton = screen.queryByText(
      messages.inviteResearcher.defaultMessage,
    );
    expect(inviteButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
