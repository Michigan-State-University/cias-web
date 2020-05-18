import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Centered } from '../index';

describe('<Centered />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Centered />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
