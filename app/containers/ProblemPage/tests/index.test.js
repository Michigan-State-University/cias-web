/**
 *
 * Tests for ProblemPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

import ProblemPage from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<ProblemPage />', () => {
  let store;
  let modalContainer;
  let mainAppContainer;
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
    ReactDOM.createPortal = jest.fn(element => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);

    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
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
        problems: [{ name: 'Name', status: 'draft', interventions_size: 2 }],
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
