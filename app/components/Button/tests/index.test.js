import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import { Button } from '../index';
import { StyledButton } from '../StyledButton';

describe('<Button />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Button />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
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
