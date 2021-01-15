/**
 *
 * Tests for SessionTile
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';

import { SessionTile } from '../index';

describe('<SessionTile />', () => {
  const defaultProps = {
    id: 'test',
    title: 'test',
    link: '/test',
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SessionTile {...defaultProps} />
        </IntlProvider>
      </MemoryRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <MemoryRouter>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SessionTile {...defaultProps} />
        </IntlProvider>
      </MemoryRouter>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
