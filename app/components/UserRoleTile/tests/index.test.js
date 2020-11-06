/**
 *
 * Tests for UserRoleTile
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Roles } from 'models/User/UserRoles';
import UserRoleTile from '../index';

describe('<UserRoleTile />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<UserRoleTile role={Roles.admin} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<UserRoleTile role={Roles.admin} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot for disabled', () => {
    const { container } = render(<UserRoleTile disabled role={Roles.admin} />);
    expect(container).toMatchSnapshot();
  });
});
