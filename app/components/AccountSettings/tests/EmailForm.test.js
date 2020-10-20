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
import createModalForTests from 'utils/createModalForTests';

import EmailForm from '../EmailForm';

describe('<EmailForm />', () => {
  beforeAll(() => {
    createModalForTests();
  });
  const defaultProps = {
    formatMessage: jest.fn(msg => msg.defaultMessage),
    user: { email: 'test@test.pl' },
    changeEmail: jest.fn(),
    error: '',
    loading: false,
    changeErrorValue: jest.fn(),
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <EmailForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <EmailForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should edit email correctly', async () => {
    const { getByTestId } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <EmailForm {...defaultProps} />
      </IntlProvider>,
    );

    const newEmail = 'new@test.com';
    const oldPassword = 'Password1!';
    const emailInput = getByTestId('email-input').querySelector('input');
    fireEvent.change(emailInput, { target: { value: newEmail } });
    fireEvent.blur(emailInput);
    const passwordInput = getByTestId('password-confirmation').querySelector(
      'input',
    );
    fireEvent.change(passwordInput, { target: { value: oldPassword } });
    fireEvent.blur(passwordInput);
    const confirmButton = getByTestId('confirm-button');
    fireEvent.click(confirmButton);

    await wait(() => {
      expect(defaultProps.changeEmail).toHaveBeenCalledWith({
        newEmail,
        oldPassword,
      });
    });
  });
});
