import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import {
  NAVIGATION,
  Roles,
  PasswordAuthenticatedRoles,
} from 'models/User/RolesManager';

import { RoutePath } from 'global/constants';

import { createTestStore } from 'utils/testUtils/storeUtils';
import history from 'utils/history';

import AppRoute from '../index';

const Component = () => <div>Component</div>;

describe('<AppRoute />', () => {
  const initialState = {
    auth: {
      user: {
        id: '123sas',
        firstName: 'John',
        lastName: 'Doe',
        roles: ['admin'],
      },
    },
  };
  let store;
  beforeAll(() => {
    store = createTestStore(initialState);
  });
  const defaultProps = {
    exact: true,
    path: '/component',
    protectedRoute: true,
    allowedRoles: PasswordAuthenticatedRoles,
    component: Component,
    navbarProps: {
      navbarId: NAVIGATION.DEFAULT,
    },
    location: {},
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <AppRoute {...defaultProps} />
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
            <AppRoute {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render public route and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <AppRoute protectedRoute={false} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should redirect to login', () => {
    const newState = {
      ...initialState,
      auth: { ...initialState.auth, user: undefined },
    };
    store = createTestStore(newState);
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter
            history={history}
            initialEntries={[RoutePath.DASHBOARD]}
          >
            <AppRoute {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render default', () => {
    const newState = {
      ...initialState,
      auth: {
        ...initialState.auth,
        user: { ...initialState.user, roles: ['researcher'] },
      },
    };
    const newProps = {
      ...defaultProps,
      allowedRoles: [Roles.Admin],
    };
    store = createTestStore(newState);
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <AppRoute {...newProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
