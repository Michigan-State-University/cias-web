import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ScreenListItem from '../index';

describe('<ScreenListItem />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<ScreenListItem />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
