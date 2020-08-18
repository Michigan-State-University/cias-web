/**
 *
 * Tests for ProblemPage
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

import ProblemPage from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<ProblemPage />', () => {
  let store;
  const reducer = state => state;
  const initialState = {
    problems: {
      problems: [],
      fetchProblemLoading: true,
      fetchProblemError: null,
    },
  };

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
          <MemoryRouter>
            <ProblemPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot with loader', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <ProblemPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot without interventions', () => {
    store = createStore(reducer, {
      problems: {
        problems: [],
        fetchProblemLoading: false,
        fetchProblemError: null,
      },
    });
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <ProblemPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot with interventions', () => {
    store = createStore(reducer, {
      problems: {
        problems: [{ name: 'Name', status: 'draft', interventions: [{}, {}] }],
        fetchProblemLoading: false,
        fetchProblemError: null,
      },
    });
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <ProblemPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
