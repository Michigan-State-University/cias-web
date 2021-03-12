import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Dropzone from '../index';

describe('<Dropzone />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Dropzone />);
    expect(container).toMatchSnapshot();
  });
  it('should match the snapshot with shadow', () => {
    const { container } = render(<Dropzone withShadow />);
    expect(container).toMatchSnapshot();
  });
});
