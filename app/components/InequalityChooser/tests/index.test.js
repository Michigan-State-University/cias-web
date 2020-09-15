/**
 *
 * Tests for InequalityChooser
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import InequalityChooser from '../index';

describe('<InequalityChooser />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<InequalityChooser />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<InequalityChooser />);
    expect(container).toMatchSnapshot();
  });
});
