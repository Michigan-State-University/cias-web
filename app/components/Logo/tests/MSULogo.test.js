import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { MSULogo } from '../index';

describe('<MSULogo />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild: renderedComponent },
    } = render(<MSULogo />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
