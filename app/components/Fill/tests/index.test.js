import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import { Fill } from '../index';

describe('<Fill />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Fill />);
    expect(container).toMatchSnapshot();
  });
});
