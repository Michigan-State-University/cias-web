import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Input } from '../index';

describe('<Input />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Input />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
