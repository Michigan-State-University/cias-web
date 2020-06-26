import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import { browserHistory } from 'react-router-dom';
import HomePage from '../index';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it.skip('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Provider store={store}>
          <ConnectedRouter>
            <HomePage />
          </ConnectedRouter>
        </Provider>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
