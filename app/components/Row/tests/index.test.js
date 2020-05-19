import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Row from '../index';

describe('<Row />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Row />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
