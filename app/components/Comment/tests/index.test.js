import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Comment from '../index';

describe('<Comment />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Comment />);
    expect(container).toMatchSnapshot();
  });
});
