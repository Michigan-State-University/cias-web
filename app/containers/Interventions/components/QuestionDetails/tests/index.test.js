import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import QuestionDetails from '../index';

describe('<QuestionDetails />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<QuestionDetails />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
