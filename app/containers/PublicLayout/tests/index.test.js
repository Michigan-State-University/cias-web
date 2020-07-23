/**
 *
 * Tests for PublicLayout
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';

import { PublicLayout } from '../index';

describe('<PublicLayout />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <PublicLayout>
        <div>Children</div>
      </PublicLayout>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <PublicLayout>
        <div>Children</div>
      </PublicLayout>,
    );
    expect(container).toMatchSnapshot();
  });
});
