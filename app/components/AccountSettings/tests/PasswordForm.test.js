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

import PasswordForm from '../PasswordForm';

describe('<PasswordForm />', () => {
  beforeAll(() => {
    createModalForTests();
  });
  const defaultProps = {
    formatMessage: jest.fn(msg => msg.defaultMessage),
    changePassword: jest.fn(),
    error: '',
    loading: false,
    changeErrorValue: jest.fn(),
    onClose: jest.fn(),
    visible: true,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PasswordForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PasswordForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render error and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PasswordForm {...defaultProps} error="Test error" />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should call close modal', async () => {
    const { getByTestId } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PasswordForm {...defaultProps} />
      </IntlProvider>,
    );

    const closeModalButton = getByTestId('close-modal-button');
    fireEvent.click(closeModalButton);

    await waitFor(() => {
      expect(defaultProps.changeErrorValue).toHaveBeenCalled();
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('Should call change password', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PasswordForm {...defaultProps} />
      </IntlProvider>,
    );

    const oldPassword = 'Password1!';
    const newPassword = 'Password2!';

    const oldPasswordInput = getByPlaceholderText('Your old password');
    fireEvent.change(oldPasswordInput, { target: { value: oldPassword } });
    const newPasswordInput = getByPlaceholderText('Your new password');
    fireEvent.change(newPasswordInput, { target: { value: newPassword } });
    const passwordConfirmationInput = getByPlaceholderText(
      'Confirm your new password',
    );
    fireEvent.change(passwordConfirmationInput, {
      target: { value: newPassword },
    });
    const submitButton = getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(defaultProps.changePassword).toHaveBeenCalledWith({
        oldPassword,
        newPassword,
        newPasswordConfirmation: newPassword,
      });
    });
  });
});
