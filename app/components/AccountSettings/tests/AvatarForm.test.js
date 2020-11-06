/**
 *
 * Tests for AccountSettings
 *
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';
import createModalForTests from 'utils/createModalForTests';

import AvatarForm from '../AvatarForm';

describe('<AvatarForm />', () => {
  beforeAll(() => {
    createModalForTests();
  });
  const defaultProps = {
    user: { avatar: 'src', firstName: 'test', lastName: 'test' },
    addAvatar: jest.fn(),
    deleteAvatar: jest.fn(),
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <AvatarForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <AvatarForm {...defaultProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should call remove avatar', () => {
    const { getByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <AvatarForm {...defaultProps} />
      </IntlProvider>,
    );
    const openModalButton = getByText('Remove profile photo');
    fireEvent.click(openModalButton);
    const removeAvatarButton = getByText('Confirm');
    fireEvent.click(removeAvatarButton);
    expect(defaultProps.deleteAvatar).toHaveBeenCalled();
  });
});
