/**
 *
 * Tests for AccountSettings
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';

import TimezoneForm from '../TimezoneForm';

describe('<TimezoneForm />', () => {
  const defaultProps = {
    user: { timeZone: 'America/New_York' },
    editUser: jest.fn(),
    formatMessage: jest.fn(msg => msg.defaultMessage),
  };

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

    await wait(() => {
      expect(defaultProps.editUser).toHaveBeenCalledWith({
        timeZone: 'Africa/Harare',
      });
    });
  });
});
