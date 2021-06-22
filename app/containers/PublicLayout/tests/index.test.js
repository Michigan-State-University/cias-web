/**
 *
 * Tests for PublicLayout
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';

import { PublicLayout } from '../index';

describe('<PublicLayout />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PublicLayout>
          <div>Children</div>
        </PublicLayout>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PublicLayout>
          <div>Children</div>
        </PublicLayout>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
