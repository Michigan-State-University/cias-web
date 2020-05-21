import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Text from '../index';

describe('<Text />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Text />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
