/**
 *
 * Tests for Reports
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory, MemoryRouter } from 'react-router-dom';
import configureStore from 'configureStore';

import LatestReport from '../index';

describe('<LatestReport />', () => {
  let store;
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <LatestReport />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <LatestReport />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
