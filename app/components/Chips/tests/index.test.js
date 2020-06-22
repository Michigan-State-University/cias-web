import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Chips from '../index';

describe('<Chips />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(<Chips>Animation</Chips>)
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
