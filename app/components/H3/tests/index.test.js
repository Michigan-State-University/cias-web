import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import H3 from '../index';

describe('<H3 />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<H3 />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
