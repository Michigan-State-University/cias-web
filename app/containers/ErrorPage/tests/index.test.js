import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createTestStore } from 'utils/testUtils/storeUtils';
import ErrorPage from '../index';

describe('<ErrorPage />', () => {
  let store;

  beforeAll(() => {
    store = createTestStore({});
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en">
            <ErrorPage />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
