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

import { DEFAULT_LOCALE } from 'i18n';
import ReactDOM from 'react-dom';
import { UserList } from '../index';

describe('<UserList />', () => {
  let store;
  let props;

  let modalContainer;
  let mainAppContainer;

  beforeAll(() => {
    store = configureStore({}, browserHistory);

    ReactDOM.createPortal = jest.fn(element => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
  });
  beforeEach(() => {
    props = {
      fetchUsersRequest: jest.fn(),
      changeActivateStatus: jest.fn(),
      intl: { formatMessage: jest.fn() },
      userList: {
        users: [
          {
            id: 1,
            full_name: 'test',
            roles: ['participant'],
            email: 'test@test.pl',
            active: false,
          },
          {
            id: 2,
            full_name: 'test2',
            roles: ['researcher'],
            email: 'test2@test.pl',
            active: true,
          },
          {
            id: 3,
            full_name: 'test3',
            roles: ['admin'],
            email: 'test3@test.pl',
            active: false,
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
