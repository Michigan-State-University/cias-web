/**
 *
 * Tests for UserSelector
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';

import { UserListReducer } from 'global/reducers/userList';
import { authReducer } from 'global/reducers/auth';
import { createTestStore } from 'utils/testUtils/storeUtils';
import UserSelector from '../index';

describe('<UserSelector />', () => {
  let store;
  const initialState = {
    auth: {
      user: { id: 1 },
    },
  };
  beforeAll(() => {
    store = createTestStore(initialState);
    store.runSaga = () => {};
    store.injectedReducers = {
      userList: UserListReducer,
      auth: authReducer,
    };
    store.injectedSagas = {};
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <UserSelector />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild: renderedComponent },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <UserSelector />
        </Provider>
      </IntlProvider>,
    );

    expect(renderedComponent).toMatchSnapshot();
  });
});
