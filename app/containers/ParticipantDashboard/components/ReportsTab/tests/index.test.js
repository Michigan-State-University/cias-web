/**
 *
 * Tests for ReportsTab
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { createReport } from 'utils/reducerCreators';
import ReportsPage from '../index';

describe('<ReportsPage />', () => {
  let store;
  beforeAll(() => {
    store = createTestStore({
      dashboard: {
        reports: [createReport(1)],
        reportsSize: 1,
        loaders: {
          fetchReportsLoading: false,
        },
        errors: {},
      },
    });
  });

  it('Should render and match the snapshot and to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <ReportsPage />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(spy).not.toHaveBeenCalled();
    expect(firstChild).toMatchSnapshot();
  });
});
