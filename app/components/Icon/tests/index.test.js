/**
 *
 * Tests for Icon
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Icon from '../index';

describe('<Icon />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Icon src="mock.svg" />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<Icon />);
    expect(container).toMatchSnapshot();
  });
});
