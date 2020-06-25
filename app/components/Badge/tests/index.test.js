import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Badge from '../index';

describe('<Badge />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Badge />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
