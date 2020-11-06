import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import H2 from '../index';

describe('<H2 />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<H2 />);
    expect(container).toMatchSnapshot();
  });
});
