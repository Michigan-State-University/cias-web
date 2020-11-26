/**
 *
 * Tests for GroupActionButton
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import GroupActionButton from '../index';

describe('<GroupActionButton />', () => {
  const mockedFunctions = {
    action: jest.fn(),
  };

  const defaultProps = {
    activeIcon: '/active.svg',
    inactiveIcon: '/inactive.svg',
    label: <>label</>,
    active: true,
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<GroupActionButton {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<GroupActionButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
