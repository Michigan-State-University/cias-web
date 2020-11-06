import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Chips from '../index';

describe('<Chips />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Chips>Animation</Chips>);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = render(<Chips>Animation</Chips>);
    expect(container).toMatchSnapshot();
  });
  it('should match the snapshot for active', () => {
    const { container } = render(<Chips isActive>Animation</Chips>);
    expect(container).toMatchSnapshot();
  });
  it('should match the snapshot for disabled', () => {
    const { container } = render(<Chips disabled>Animation</Chips>);
    expect(container).toMatchSnapshot();
  });
});
