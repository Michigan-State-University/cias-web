/**
 *
 * Tests for ActionIcon
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { MemoryRouter } from 'react-router-dom';
import testIcon from 'assets/svg/addSign.svg';
import ActionIcon from '../index';

describe('<ActionIcon />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <ActionIcon />
      </MemoryRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot as link', () => {
    const { container } = render(
      <MemoryRouter>
        <ActionIcon to="/" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot as button', () => {
    const { container } = render(
      <MemoryRouter>
        <ActionIcon onClick={jest.fn()} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot with different icon', () => {
    const { container } = render(
      <MemoryRouter>
        <ActionIcon onClick={jest.fn()} iconSrc={testIcon} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
