import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import Dropzone from '../index';

describe('<QuestionDetails />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Dropzone />);
    expect(container).toMatchSnapshot();
  });
  it('should match the snapshot with shadow', () => {
    const { container } = render(<Dropzone withShadow />);
    expect(container).toMatchSnapshot();
  });
});
