/**
 *
 * Tests for RegisterPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import { MemoryRouter, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import RegisterPage from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<RegisterPage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const props = {
      location: {
        search: '',
      },
    };
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <RegisterPage {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot for participant', () => {
    const props = {
      location: {
        search: '',
      },
    };
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <RegisterPage {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the researcher', () => {
    const props = {
      location: {
        search: '?invitation_token=enCB7gVfDNS5liLLEGCF8A&email=test@gmail.com',
      },
    };
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <RegisterPage {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
