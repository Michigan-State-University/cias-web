/**
 *
 * Tests for ReportTile
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { initialState } from 'global/reducers/globalState';
import { createTestStore } from 'utils/testUtils/storeUtils';

import { ReportTile } from '../index';

describe('<ReportTile />', () => {
  const defaultProps = {
    id: 'test',
    title: 'test',
    formatMessage: jest.fn(),
  };
  let store;

  beforeAll(() => {
    store = createTestStore({ globalState: initialState });
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <ReportTile {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <ReportTile {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
