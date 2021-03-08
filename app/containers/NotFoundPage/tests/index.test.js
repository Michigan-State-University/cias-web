import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { Provider } from 'react-redux';

import NotFoundPage from '../index';

describe('<NotFoundPage />', () => {
  let store;

  beforeAll(() => {
    store = createTestStore({});
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <NotFoundPage />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
