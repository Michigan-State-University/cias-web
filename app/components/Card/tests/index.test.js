import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Card } from '../index';

describe('<Card />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Card />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
