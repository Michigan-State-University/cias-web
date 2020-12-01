/**
 *
 * Tests for InterventionDetails
 *
 */
import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';

import InterventionDetails from '../InterventionDetails';

const defaultProps = {
  createdAt: '2020-09-30T10:00:00',
  updatedAt: '2020-09-30T10:00:00',
  user: {
    email: 'test@test.com',
    first_name: 'UserFirstName',
    last_name: 'UserLastName',
  },
};

describe('<InterventionDetails />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InterventionDetails {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InterventionDetails {...defaultProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
