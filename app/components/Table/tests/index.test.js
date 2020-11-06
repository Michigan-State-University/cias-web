import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Table } from '../index';

describe('<Table />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Table />);
    expect(container).toMatchSnapshot();
  });
});
