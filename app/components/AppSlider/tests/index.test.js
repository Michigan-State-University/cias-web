import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import AppSlider from '../index';

describe('<AppSlider />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<AppSlider />);
    expect(container).toMatchSnapshot();
  });
});
