import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import Box from '../index';

describe('<Box />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Box />);
    expect(container).toMatchSnapshot();
  });
});
