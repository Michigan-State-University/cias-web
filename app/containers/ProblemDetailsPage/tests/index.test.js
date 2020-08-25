import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { problemReducer } from 'global/reducers/problem';

import ProblemDetailsPage from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const defaultProps = {
  match: {
    params: {
      problemId: '1jkajsd2-112a',
    },
  },
};

describe('<ProblemDetailsPage />', () => {
  let store;

  const initialState = {};
  const reducer = state => state;
  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {
      problem: problemReducer,
    };
    store.injectedSagas = {};
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <ProblemDetailsPage {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it.only('Should render loader and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Provider store={store}>
          <MemoryRouter>
            <ProblemDetailsPage {...defaultProps} />
          </MemoryRouter>
        </Provider>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
