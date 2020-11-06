/**
 *
 * Tests for Divider
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Divider from '../index';

describe('<Divider />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Divider />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<Divider />);
    expect(container).toMatchSnapshot();
  });
});
