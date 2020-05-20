import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Box from '../index';

describe('<Box />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Box />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
