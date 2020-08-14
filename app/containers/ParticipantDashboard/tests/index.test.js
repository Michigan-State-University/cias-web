/**
 *
 * Tests for ParticipantDashboard
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import { browserHistory, MemoryRouter } from 'react-router-dom';
import ParticipantDashboard from '../index';

describe('<ParticipantDashboard />', () => {
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
            <ParticipantDashboard />
          </MemoryRouter>
        </Provider>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
