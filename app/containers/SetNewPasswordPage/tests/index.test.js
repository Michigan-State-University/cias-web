/**
 *
 * Tests for SetNewPasswordPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

import SetNewPasswordPage from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<SetNewPasswordPage />', () => {
  const reducer = state => state;
  const initialState = {};
  let store;
  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};
  });

  const defaultProps = {
    location: {
      search:
        '?access-token=enCB7gVfDNS5liLLEGCF8A&client=-CmrrhiGqVQ7283-93uZEg&client_id=-CmrrhiGqVQ7283-93uZEg&config=default&expiry=4105036800&reset_password=true&token=enCB7gVfDNS5liLLEGCF8A&uid=petters1111%40gmail.com',
    },
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <SetNewPasswordPage {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <SetNewPasswordPage {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
