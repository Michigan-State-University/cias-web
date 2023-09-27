/**
 *
 * Tests for ReportFilter
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';
import { formatMessage } from 'utils/intlOutsideReact';
import {
  filterOptions,
  PARTICIPANTS,
  SORT_BY_LATEST,
} from 'global/reducers/generatedReports/constants';

import { ReportsFilter } from '../index';

describe('<ReportsFilter />', () => {
  const filterOpts = filterOptions(false);
  const defaultProps = {
    formatMessage,
    filterOptions: filterOpts,
    activeFilters: [PARTICIPANTS],
    activeSort: SORT_BY_LATEST,
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ReportsFilter {...defaultProps} />
        </IntlProvider>
      </MemoryRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <MemoryRouter>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ReportsFilter {...defaultProps} />
        </IntlProvider>
      </MemoryRouter>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
