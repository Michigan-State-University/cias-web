/**
 *
 * Tests for NumberQuestion
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { formatMessage } from 'utils/intlOutsideReact';
import { createTestStore } from 'utils/testUtils/storeUtils';

import { intlProviderConfig } from 'containers/AppLanguageProvider';

import PhoneQuestion from '../PhoneQuestion';

describe('<PhoneQuestion />', () => {
  let store;
  let modalContainer;
  const initialState = {};

  const mockedFunctions = {
    selectAnswer: jest.fn(),
    formatMessage,
    showError: jest.fn(),
  };

  const defaultProps = {
    question: {
      body: {
        variable: 'test',
      },
      settings: { required: true },
    },
    answerBody: [],
    ...mockedFunctions,
  };

  beforeAll(() => {
    store = createTestStore(initialState);
    store.runSaga = () => ({
      cancel: () => {},
      toPromise: () => Promise.resolve(),
    });
    store.injectedReducers = {};
    store.injectedSagas = {};
  });

  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
          <MemoryRouter>
            <PhoneQuestion {...defaultProps} />
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
            <PhoneQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
