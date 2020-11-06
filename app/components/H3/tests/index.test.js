import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import H3 from '../index';

describe('<H3 />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<H3 />);
    expect(container).toMatchSnapshot();
  });
});
