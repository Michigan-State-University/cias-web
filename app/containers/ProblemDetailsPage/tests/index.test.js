import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { problemReducer } from 'global/reducers/intervention';
import { createTestStore } from 'utils/testUtils/storeUtils';

import ProblemDetailsPage from '../index';

describe('<ProblemDetailsPage />', () => {
  const defaultProps = {
    match: {
      params: {
        interventionId: '1jkajsd2-112a',
      },
    },
  };
  const initialState = {};
  const store = createTestStore(initialState);

  beforeAll(() => {
    store.injectedReducers = {
      problem: problemReducer,
    };
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

  it('Should render loader and match the snapshot', () => {
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
