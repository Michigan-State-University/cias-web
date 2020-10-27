import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';

import Switch from '../index';

describe('<Switch />', () => {
  const defaultProps = {
    onToggle: jest.fn(),
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Switch {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });
  it('should match the snapshot', () => {
    const { container } = render(<Switch {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it('should call on toggle', () => {
    const { getByTestId } = render(<Switch {...defaultProps} />);
    const switchInput = getByTestId('switch-input');
    fireEvent.click(switchInput, { target: { checked: true } });
    expect(defaultProps.onToggle).toHaveBeenCalled();
  });
});
