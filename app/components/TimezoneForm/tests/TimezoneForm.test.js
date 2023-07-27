/**
 *
 * Tests for TimezoneForm
 *
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';

import { TimezoneForm } from '../TimezoneForm';

describe('<TimezoneForm />', () => {
  const defaultProps = {
    timeZone: 'America/New_York',
    onChange: jest.fn(),
    formatMessage: jest.fn((msg) => msg.defaultMessage),
  };

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2020, 9, 31));
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TimezoneForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TimezoneForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should handle edit correctly', async () => {
    const { getByTestId, getByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TimezoneForm {...defaultProps} />
      </IntlProvider>,
    );

    const newTimezone = 'Africa/Harare (UTC +02:00)';
    const timezoneSelect = getByTestId('select').querySelector('input');

    fireEvent.focus(timezoneSelect);
    fireEvent.keyDown(timezoneSelect, { key: 'ArrowDown', code: 40 });
    const option1 = getByText(newTimezone);
    fireEvent.click(option1);

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith('Africa/Harare');
    });
  });
});
