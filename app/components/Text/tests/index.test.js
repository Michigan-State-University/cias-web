import React from 'react';
import { render } from 'react-testing-library';
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
