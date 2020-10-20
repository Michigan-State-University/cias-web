/**
 *
 * Tests for AccountSettings
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent, wait, act } from 'react-testing-library';
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

  it.skip('Should edit email correctly', async () => {
    const { getByTestId } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <EmailForm {...defaultProps} />
      </IntlProvider>,
    );
    const emailInput = getByTestId('email-input').querySelector('input');
    await wait(() => {
      fireEvent.change(emailInput, { target: { value: 'new@test.com' } });
    });
    await wait(() => {
      fireEvent.blur(emailInput);
    });
    const passwordInput = getByTestId('password-confirmation').querySelector(
      'input',
    );
    await wait(() => {
      fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    });
    await wait(() => {
      fireEvent.blur(passwordInput);
    });
    const confirmButton = getByTestId('confirm-button');
    await wait(() => {
      fireEvent.click(confirmButton);
    });

    await act(() => {
      expect(defaultProps.changeEmail).toHaveBeenCalled();
    });
  });
});
