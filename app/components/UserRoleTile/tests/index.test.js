/**
 *
 * Tests for UserRoleTile
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Roles } from 'models/User/RolesManager';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import UserRoleTile from '../index';

describe('<UserRoleTile />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <UserRoleTile role={Roles.Admin} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <UserRoleTile role={Roles.Admin} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot for disabled', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <UserRoleTile role={Roles.Admin} disabled />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
