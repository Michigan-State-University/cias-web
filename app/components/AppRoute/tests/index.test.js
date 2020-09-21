import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { Roles } from 'models/User/UserRoles';
import { DEFAULT_LOCALE } from 'i18n';

import AppRoute from '../index';

const Component = () => <div>Component</div>;

const configureStore = (reducer, initialState) => {
  const store = createStore(reducer, initialState);
  store.runSaga = () => {};
  store.injectedReducers = {};
  store.injectedSagas = {};
  return store;
};

describe('<AppRoute />', () => {
  const reducer = state => state;
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
    store = configureStore(reducer, initialState);
  });
  const defaultProps = {
    exact: true,
    path: '/component',
    protectedRoute: true,
    allowedRoles: Roles.allRoles,
    component: Component,
    navbarProps: {
      navbarId: 'default',
    },
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

  it.skip('Should redirect to login', () => {
    const newState = {
      ...initialState,
      auth: { ...initialState.auth, user: undefined },
    };
    store = configureStore(reducer, newState);
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
      allowedRoles: [Roles.admin],
    };
    store = configureStore(reducer, newState);
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