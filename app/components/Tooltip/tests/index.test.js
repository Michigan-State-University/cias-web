/**
 *
 * Tests for Tooltip
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
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
