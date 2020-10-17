/**
 *
 * Tests for ShareBox
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ShareBox from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<ShareBox />', () => {
  const reducer = state => state;
  const initialState = {
    problem: {
      currentInterventionIndex: 0,
      problem: {
        interventions: [
          {
            name: 'Name',
            slug: 'Slug-id-e-intervention',
            emails: ['mail@mail.com'],
          },
        ],
      },
      loaders: {
        sendInterventionLoading: false,
        interventionEmailLoading: {
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
          <ShareBox />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ShareBox />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
