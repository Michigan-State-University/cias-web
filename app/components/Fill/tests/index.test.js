import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Fill } from '../index';

describe('<Fill />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Fill />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
