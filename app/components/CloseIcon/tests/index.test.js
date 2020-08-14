/**
 *
 * Tests for CloseIcon
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import { MemoryRouter } from 'react-router-dom';
import CloseIcon from '../index';

describe('<CloseIcon />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <CloseIcon />
      </MemoryRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot as link', () => {
    const { container } = render(
      <MemoryRouter>
        <CloseIcon to="/" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot as button', () => {
    const { container } = render(
      <MemoryRouter>
        <CloseIcon onClick={jest.fn()} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
