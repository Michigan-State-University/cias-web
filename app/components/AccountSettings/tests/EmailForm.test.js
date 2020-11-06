/**
 *
 * Tests for AccountSettings
 *
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

  it('Should render error and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <EmailForm {...defaultProps} error="Test error" />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should call edit email correctly', async () => {
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

    await waitFor(() => {
      expect(defaultProps.changeEmail).toHaveBeenCalledWith({
        newEmail,
        oldPassword,
      });
    });
  });

  it('Should call close modal', async () => {
    const { getByTestId } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <EmailForm {...defaultProps} />
      </IntlProvider>,
    );

    const newEmail = 'new@test.com';
    const emailInput = getByTestId('email-input').querySelector('input');
    fireEvent.change(emailInput, { target: { value: newEmail } });
    fireEvent.blur(emailInput);
    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(defaultProps.changeErrorValue).toHaveBeenCalled();
    });
  });
});
