import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Text from '../index';

describe('<Text />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Text />);
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot for disabled', () => {
    const { container } = render(<Text disabled />);
    expect(container).toMatchSnapshot();
  });
});
