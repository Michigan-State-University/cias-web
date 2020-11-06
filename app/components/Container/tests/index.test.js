import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import AppContainer from '../index';

describe('<AppContainer />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild: renderedComponent },
    } = render(
      <AppContainer>
        <div />
      </AppContainer>,
    );

    expect(renderedComponent).toMatchSnapshot();
  });
});
