/**
 *
 * Tests for ShareBox
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { DEFAULT_LOCALE } from '../../../i18n';
import ShareBox from '../index';
import { ShareBoxType } from '../types';

describe('<ShareBox />', () => {
  const reducer = (state) => state;
  const initialState = {
    intervention: {
      currentSessionIndex: 0,
      intervention: {
        sessions: [
          {
            name: 'Name',
            slug: 'Slug-id-e-session',
            emails: ['mail@mail.com'],
            position: 1,
          },
        ],
      },
      loaders: {
        sendSessionLoading: false,
        sessionEmailLoading: {
          email: null,
        },
      },
    },
  };
  let store;
  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ShareBox type={ShareBoxType.SESSION} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ShareBox type={ShareBoxType.SESSION} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
