import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import AppSlider from '../index';

describe('<AppSlider />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<AppSlider />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
