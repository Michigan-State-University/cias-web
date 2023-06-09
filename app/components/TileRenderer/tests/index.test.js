/**
 *
 * Tests for TileRenderer
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import TileRenderer from '../index';

describe('<TileRenderer />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<TileRenderer />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<TileRenderer />);
    expect(container).toMatchSnapshot();
  });
});
