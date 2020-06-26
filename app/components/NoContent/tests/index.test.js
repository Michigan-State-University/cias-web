import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import NoContent from '../index';

describe('<NoContent />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<NoContent />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
