import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Img from '../index';

describe('<Img />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Img />);
    expect(container).toMatchSnapshot();
  });
  it('should match disabled snapshot', () => {
    const { container } = render(<Img disabled />);
    expect(container).toMatchSnapshot();
  });
});
