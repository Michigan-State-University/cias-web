import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import H1 from '../index';

describe('<H1 />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<H1 />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
