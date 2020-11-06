import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import Dropdown from '../index';

const defaultProps = {
  top: false,
  options: [
    {
      id: 'id',
      label: 'Label',
      action: jest.fn(),
      color: 'red',
      icon: 'img.png',
    },
  ],
};

describe('<Dropdown />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Dropdown {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });
  it('should render on top and  match the snapshot', () => {
    const { container } = render(<Dropdown {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it('should render on bottom and match the snapshot', () => {
    const newProps = {
      ...defaultProps,
      top: true,
    };
    const { container } = render(<Dropdown {...newProps} />);
    const img = document.querySelectorAll('img')[0];
    fireEvent.click(img);
    expect(container).toMatchSnapshot();
  });
  it('should open dropdown', () => {
    const { container } = render(<Dropdown {...defaultProps} />);
    const img = document.querySelectorAll('img')[0];
    fireEvent.click(img);
    expect(container.innerHTML).toContain('Label');
  });
  it('should call action in dropdown', () => {
    const { getByText } = render(<Dropdown {...defaultProps} />);
    const img = document.querySelectorAll('img')[0];
    fireEvent.click(img);
    const label = getByText('Label');
    fireEvent.click(label);
    expect(defaultProps.options[0].action).toHaveBeenCalledTimes(1);
  });
});
