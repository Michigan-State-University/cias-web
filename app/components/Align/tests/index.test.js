import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Align } from '../index';

describe('<Align />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Align />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
