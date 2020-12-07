import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

import StyledLink from '../index';

describe('<H1 />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <StyledLink to="https://example.com">Click me!</StyledLink>
      </MemoryRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
  it('should match the snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <StyledLink to="https://example.com">Click me!</StyledLink>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
