/**
 *
 * Tests for FinishScreen
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import LocalStorageService from 'utils/localStorageService';
import { Roles } from 'models/User/UserRoles';
import { formatMessage } from 'utils/intlOutsideReact';
import FinishScreen from '../FinishScreen';

describe('<FinishScreen />', () => {
  LocalStorageService.setState({ roles: [Roles.participant] });
  const defaultProps = {
    selectAnswer: jest.fn(),
    formatMessage,
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <FinishScreen {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <FinishScreen {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
