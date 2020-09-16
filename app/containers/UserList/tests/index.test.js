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
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';

import { UserList } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<UserList />', () => {
  let store;
  let props;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  beforeEach(() => {
    props = {
      fetchUsersRequest: jest.fn(),
      intl: { formatMessage: jest.fn() },
      userList: {
        users: [
          {
            id: 1,
            full_name: 'test',
            roles: ['participant'],
            email: 'test@test.pl',
          },
        ],
      },
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <UserList {...props} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <UserList {...props} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
