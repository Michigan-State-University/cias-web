/**
 *
 * Tests for LoginPage
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';

import LoginPage from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';

describe('<LoginPage />', () => {
  let store;
  let dispatch;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
    dispatch = jest.fn();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <LoginPage dispatch={dispatch} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <LoginPage dispatch={dispatch} />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
