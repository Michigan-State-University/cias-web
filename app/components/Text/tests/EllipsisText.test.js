import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import EllipsisText from '../EllipsisText';

describe('<EllipsisText />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<EllipsisText />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(<EllipsisText text="Test" />)
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
