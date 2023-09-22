import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import Dropdown from '../index';

const defaultProps = {
  top: false,
  id: 'test-dropdown',
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
});
