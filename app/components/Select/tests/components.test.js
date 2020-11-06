/**
 *
 * Tests for components
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Option } from '../components';

const defaultProps = {
  data: { label: 'test' },
  isSelected: true,
  isFocused: true,
  selectProps: { formatLabel: jest.fn(s => s) },
};

describe('<Option />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Option {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<Option {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it('Should render and match the snapshot', () => {
    const newProps = {
      data: { label: 'test', additionalData: '2' },
      isSelected: true,
      isFocused: true,
      selectProps: { formatLabel: jest.fn((s, t) => `${s}${t}`) },
    };
    const { container } = render(<Option {...newProps} />);
    expect(container).toMatchSnapshot();
  });
});
