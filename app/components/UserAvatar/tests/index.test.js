/**
 *
 * Tests for UserAvatar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import UserAvatar from '../index';

describe('<UserAvatar />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<UserAvatar firstName="test" lastName="test" />);
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<UserAvatar firstName="test" lastName="test" />);

    expect(firstChild).toMatchSnapshot();
  });
});
