import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Circle from '../index';

describe('<Circle />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Circle />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
