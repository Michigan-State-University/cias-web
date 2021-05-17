/**
 *
 * Tests for ReactColor
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import ReactColor from '../index';

describe('<ReactColor />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ReactColor />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render checked and match the snapshot', () => {
    const { container } = render(<ReactColor />);
    expect(container).toMatchSnapshot();
  });
});
