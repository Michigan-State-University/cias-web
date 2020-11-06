import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Fill } from '../index';

describe('<Fill />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Fill />);
    expect(container).toMatchSnapshot();
  });
});
