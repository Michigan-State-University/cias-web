import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { StyledButton } from '../StyledButton';

describe('<StyledButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<StyledButton />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render styled button and match the snapshot', () => {
    const { container } = render(<StyledButton />);
    expect(container).toMatchSnapshot();
  });

  it('Should render inverted button and match the snapshot', () => {
    const { container } = render(<StyledButton disabled inverted />);
    expect(container).toMatchSnapshot();
  });
});
