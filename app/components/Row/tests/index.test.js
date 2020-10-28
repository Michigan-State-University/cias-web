import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import Row from '../index';

describe('<Row />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Row />);
    expect(container).toMatchSnapshot();
  });
});
