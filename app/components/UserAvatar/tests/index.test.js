/**
 *
 * Tests for UserAvatar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import UserAvatar from '../index';

describe('<UserAvatar />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<UserAvatar firstName="test" lastName="test" />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<UserAvatar firstName="test" lastName="test" />);

    expect(firstChild).toMatchSnapshot();
  });

  it('Should render and match the snapshot for avatar', () => {
    const {
      container: { firstChild },
    } = render(
      <UserAvatar firstName="test" lastName="test" avatar="test.src" />,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
