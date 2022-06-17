/**
 *
 * Tests for Sidebar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import 'jest-styled-components';

import { DEFAULT_LOCALE } from 'i18n';
import { Roles } from 'models/User/RolesManager';
import { createTestStore } from 'utils/testUtils/storeUtils';

import Sidebar from '../index';

describe('<Sidebar />', () => {
  let store;
  const initialState = {
    auth: {
      user: { firstName: 'test', lastName: 'test', roles: [Roles.Admin] },
    },
    session: {
      session: {
        id: '12dasc0123=21-2',
        name: 'e-Session New',
      },
    },
  };

  beforeAll(() => {
    store = createTestStore(initialState);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <Sidebar logOut={() => {}} path="/interventions" />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot with session path', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <Sidebar logOut={() => {}} path="/interventions" />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the snapshot without matching path', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <Sidebar logOut={() => {}} path="" />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
