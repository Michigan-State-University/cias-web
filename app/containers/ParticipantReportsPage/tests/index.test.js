/**
 *
 * Tests for ParticipantReportsPage
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import { browserHistory, MemoryRouter } from 'react-router-dom';
import ParticipantReportsPage from '../index';

describe('<ParticipantReportsPage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore(browserHistory, {});
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <Provider store={store}>
          <MemoryRouter>
            <ParticipantReportsPage />
          </MemoryRouter>
        </Provider>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
