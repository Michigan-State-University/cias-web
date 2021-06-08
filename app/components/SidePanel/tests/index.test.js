/**
 *
 * Tests for SidePanel
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import SidePanel from '../index';

describe('<SidePanel />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<SidePanel />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot when closed', () => {
    const { container } = render(<SidePanel isOpen={false} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot when open', () => {
    const { container } = render(<SidePanel isOpen />);
    expect(container).toMatchSnapshot();
  });
});
