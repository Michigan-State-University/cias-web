import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Img from '../index';

describe('<Img />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Img />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
