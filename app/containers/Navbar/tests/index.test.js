/**
 *
 * Tests for Navbar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';

import 'jest-styled-components';

import { Roles } from 'models/User/UserRoles';
import Navbar from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<Navbar />', () => {
  let store;
  const reducer = state => state;
  const initialState = {
    auth: {
      user: { firstName: 'test', lastName: 'test', roles: [Roles.admin] },
    },
    intervention: {
      intervention: {
        id: '12dasc0123=21-2',
        name: 'e-Intervention New',
      },
    },
  };

  beforeAll(() => {
    store = createStore(reducer, initialState);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <Navbar logOut={() => {}} path="/interventions" />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot with intervention path', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <Navbar logOut={() => {}} path="/interventions" />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the snapshot withou matching path', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <Navbar logOut={() => {}} path="" />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
