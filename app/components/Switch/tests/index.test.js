import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Switch from '../index';

describe('<Switch />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Switch />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
