import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import H2 from '../index';

describe('<H2 />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<H2 />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
