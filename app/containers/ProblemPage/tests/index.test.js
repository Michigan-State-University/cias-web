/**
 *
 * Tests for ProblemPage
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { DEFAULT_LOCALE } from 'i18n';
import ProblemPage from '../index';

describe('<ProblemPage />', () => {
  let store;
  let modalContainer;
  let mainAppContainer;
  const initialState = {
    problems: {
      problems: [],
      fetchProblemLoading: true,
      fetchProblemError: null,
    },
  };

  beforeAll(() => {
    store = createTestStore(initialState);
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
    store = createTestStore({
      problems: {
        problems: [],
        fetchProblemLoading: false,
        fetchProblemError: null,
      },
    });
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
    store = createTestStore({
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
