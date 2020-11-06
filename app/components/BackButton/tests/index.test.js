/**
 *
 * Tests for BackButton
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

import BackButton from '../index';

const defaultProps = {
  to: '#',
  children: <span>Back button</span>,
};

describe('<BackButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <BackButton {...defaultProps} />
      </MemoryRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <BackButton {...defaultProps} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
