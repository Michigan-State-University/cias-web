import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Column } from '../index';

describe('<Column />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Column />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
