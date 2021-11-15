/**
 *
 * Tests for UserDetails
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { Roles } from 'models/User/UserRoles';
import { initialState as authState } from 'global/reducers/auth';
import { intlProviderConfig } from 'containers/LanguageProvider';
import { UserDetails } from '../index';

describe('<UserDetails />', () => {
  let props;
  const initialState = {
    auth: {
      ...authState,
      user: {
        roles: [Roles.admin],
      },
    },
    user: {
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
      loaders: {
        user: false,
        resendInvitationLink: false,
      },
      errors: {
        user: null,
        resendInvitationLink: null,
      },
    },
  };
  let store;
  let modalContainer;
  let mainAppContainer;
  beforeEach(() => {
    store = createTestStore(initialState);

    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);

    props = {
      user: {
        id: '1',
        full_name: 'test test',
        roles: ['participant'],
        email: 'test@test.pl',
        avatar: null,
        active: true,
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
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
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
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
          <MemoryRouter>
            <UserDetails {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
