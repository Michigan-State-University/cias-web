/**
 *
 * Tests for ErrorAlert
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
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
