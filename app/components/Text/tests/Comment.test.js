import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Comment from '../index';

describe('<Comment />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Comment />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
