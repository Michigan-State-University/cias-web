import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import Badge from '../index';

describe('<Badge />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });
});
