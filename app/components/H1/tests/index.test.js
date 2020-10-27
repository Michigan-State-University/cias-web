import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import H1 from '../index';

describe('<H1 />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<H1 />);
    expect(container).toMatchSnapshot();
  });
});
