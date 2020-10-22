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

  it.skip('Should handle edit correctly', async () => {
    const { getByTestId, debug } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TimezoneForm {...defaultProps} />
      </IntlProvider>,
    );

    const newTimezone = 'Africa/Harare';
    const timezoneSelect = getByTestId('select');
    fireEvent.click(timezoneSelect);
    debug();
    fireEvent.change(timezoneSelect, {
      value: 'Africa/Casablanca',
      label: 'Africa/Casablanca (UTC +01:00)',
    });
    fireEvent.blur(timezoneSelect);

    await wait(() => {
      expect(defaultProps.editUser).toHaveBeenCalledWith({
        timeZone: newTimezone,
      });
    });
  });
});
