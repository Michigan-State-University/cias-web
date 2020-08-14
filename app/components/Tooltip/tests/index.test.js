/**
 *
 * Tests for Tooltip
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import Tooltip from '../index';

const defaultProps = {
  id: 'assda1-123dsa',
};

describe('<Tooltip />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Tooltip {...defaultProps}>Tooltip text</Tooltip>);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Tooltip {...defaultProps}>Tooltip text</Tooltip>,
    );
    expect(container).toMatchSnapshot();
  });
});
