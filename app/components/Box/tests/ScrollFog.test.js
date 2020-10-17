import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ScrollFogBox } from 'components/Box/ScrollFog';

describe('<ScrollFog />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<ScrollFogBox />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
