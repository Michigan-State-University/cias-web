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

import FullNameForm from '../FullNameForm';

describe('<FullNameForm />', () => {
  const defaultProps = {
    user: { firstName: 'test', lastName: 'test' },
    editUser: jest.fn(),
    formatMessage: jest.fn(msg => msg.defaultMessage),
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <FullNameForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <FullNameForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should handle edit correctly', async () => {
    const { getByTestId } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <FullNameForm {...defaultProps} />
      </IntlProvider>,
    );

    const newName = 'Newtest';
    const nameInput = getByTestId('first-name-input').querySelector('input');
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    expect(defaultProps.editUser).not.toHaveBeenCalled();
    fireEvent.change(nameInput, { target: { value: newName } });
    await waitFor(() => {
      expect(defaultProps.editUser).toHaveBeenCalledWith({
        firstName: newName,
        lastName: defaultProps.user.lastName,
      });
    });
  });
});
