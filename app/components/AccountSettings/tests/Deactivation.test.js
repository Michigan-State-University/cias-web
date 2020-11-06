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

import Deactivation from '../Deactivation';

describe('<Deactivation />', () => {
  const initialActive = true;
  const defaultProps = {
    user: { active: initialActive },
    changeStatus: jest.fn(),
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Deactivation {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot for inactive user', () => {
    const testProps = {
      user: { active: false },
      changeStatus: jest.fn(),
    };
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Deactivation {...testProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Deactivation {...defaultProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should call changeStatus', () => {
    const { getByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Deactivation {...defaultProps} />
      </IntlProvider>,
    );
    const element = getByText('Deactivate account');
    fireEvent.click(element);
    expect(defaultProps.changeStatus).toHaveBeenCalledWith(!initialActive);
  });
});
