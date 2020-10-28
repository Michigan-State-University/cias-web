import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import EllipsisText from '../EllipsisText';

describe('<EllipsisText />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<EllipsisText />);
    expect(container).toMatchSnapshot();
  });
  it('should match the snapshot', () => {
    const { container } = render(<EllipsisText text="Test" />);
    expect(container).toMatchSnapshot();
  });
});
