import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import AppContainer from '../index';

describe('<AppContainer />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<AppContainer />);
    expect(container).toMatchSnapshot();
  });
});
