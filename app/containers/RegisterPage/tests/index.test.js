/**
 *
 * Tests for RegisterPage
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';

import { intlProviderConfig } from 'containers/LanguageProvider';

import { DEFAULT_LOCALE } from 'i18n';
import RegisterPage from '../index';

describe('<RegisterPage />', () => {
  let store;
  let modalContainer;
  let mainAppContainer;

  beforeAll(() => {
    store = configureStore({}, browserHistory);

    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
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
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
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
