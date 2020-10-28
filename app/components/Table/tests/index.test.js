import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import { Table } from '../index';

describe('<Table />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Table />);
    expect(container).toMatchSnapshot();
  });
});
