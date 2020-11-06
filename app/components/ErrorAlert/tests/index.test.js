/**
 *
 * Tests for ErrorAlert
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import ErrorAlert from '../index';

describe('<ErrorAlert />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ErrorAlert errorText="error" />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<ErrorAlert errorText="error" />);
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render full page error and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<ErrorAlert errorText="error" fullPages />);
    expect(firstChild).toMatchSnapshot();
  });
});
