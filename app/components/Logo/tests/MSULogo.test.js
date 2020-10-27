import React from 'react';
import { render } from 'react-testing-library';
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
