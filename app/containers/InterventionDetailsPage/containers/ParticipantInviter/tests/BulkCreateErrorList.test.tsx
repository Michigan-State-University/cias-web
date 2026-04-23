import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import { BulkCreateErrorList } from '../BulkCreateErrorList';
import { BulkCreateErrorEntry } from '../types';

const renderWithIntl = (ui: React.ReactElement) =>
  render(<IntlProvider locale={DEFAULT_LOCALE}>{ui}</IntlProvider>);

describe('<BulkCreateErrorList />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderWithIntl(
      <BulkCreateErrorList
        errors={[{ row: 0, field: 'email', code: 'blank' }]}
      />,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders a known code with the correct translated message', () => {
    const errors: BulkCreateErrorEntry[] = [
      { row: 0, field: 'email', code: 'blank' },
    ];
    renderWithIntl(<BulkCreateErrorList errors={errors} />);

    // row is displayed as 1-based (0 + 1 = 1)
    expect(screen.getByText(/Row 1: email is required\./)).toBeInTheDocument();
  });

  it('displays row as 1-based index', () => {
    const errors: BulkCreateErrorEntry[] = [
      { row: 4, field: 'email', code: 'taken' },
    ];
    renderWithIntl(<BulkCreateErrorList errors={errors} />);

    // row 4 → displayed as 5
    expect(
      screen.getByText(/Row 5: email is already taken\./),
    ).toBeInTheDocument();
  });

  it('falls back to the unknown descriptor for unrecognised codes', () => {
    const errors: BulkCreateErrorEntry[] = [
      { row: 1, field: 'some_field', code: 'totally_new_code' },
    ];
    renderWithIntl(<BulkCreateErrorList errors={errors} />);

    // Should use the "unknown" fallback which renders: Row {row}: {field} — {code}.
    expect(
      screen.getByText(/Row 2: some_field — totally_new_code\./),
    ).toBeInTheDocument();
  });

  it('renders session-wide errors without a row number', () => {
    const errors: BulkCreateErrorEntry[] = [{ code: 'ra_session_missing' }];
    renderWithIntl(<BulkCreateErrorList errors={errors} />);

    expect(
      screen.getByText(
        /This intervention has no RA session — CSV answer columns are not supported\./,
      ),
    ).toBeInTheDocument();
  });

  it('renders multiple errors', () => {
    const errors: BulkCreateErrorEntry[] = [
      { row: 0, field: 'email', code: 'blank' },
      { row: 1, field: 's1.var1', code: 'value_not_a_number' },
    ];
    renderWithIntl(<BulkCreateErrorList errors={errors} />);

    expect(screen.getByText(/Row 1: email is required\./)).toBeInTheDocument();
    expect(
      screen.getByText(/Row 2: column "s1\.var1" — expected a number\./),
    ).toBeInTheDocument();
  });

  it('matches snapshot with multiple known codes', () => {
    const errors: BulkCreateErrorEntry[] = [
      { row: 0, field: 'email', code: 'blank' },
      { row: 0, field: 's1.q1', code: 'value_not_a_date' },
      { code: 'ra_session_missing' },
    ];
    const { container } = renderWithIntl(
      <BulkCreateErrorList errors={errors} />,
    );
    expect(container).toMatchSnapshot();
  });
});
