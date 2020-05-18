import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Button } from '../index';

describe('<Button />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Button />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
