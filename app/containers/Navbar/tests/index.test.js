/**
 *
 * Tests for Navbar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import { NavbarWithIntl as Navbar } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<Navbar />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Navbar
          logOut={() => {}}
          user={{ firstName: 'test', lastName: 'test' }}
          intervention={{ name: 'e-Intervention Name' }}
        />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Navbar
          logOut={() => {}}
          user={{ firstName: 'test', lastName: 'test' }}
          intervention={{ name: 'e-Intervention Name' }}
        />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
