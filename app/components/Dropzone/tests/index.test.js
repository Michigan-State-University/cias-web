import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Dropzone from '../index';

describe('<QuestionDetails />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Dropzone />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
