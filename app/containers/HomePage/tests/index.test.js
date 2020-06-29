import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import { browserHistory, MemoryRouter } from 'react-router-dom';
import HomePage from '../index';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Provider store={store}>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </Provider>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
