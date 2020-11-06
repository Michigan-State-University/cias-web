/**
 *
 * Tests for Checkbox
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Checkbox from '../index';

describe('<Checkbox />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Checkbox />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render checked and match the snapshot', () => {
    const { container } = render(<Checkbox checked />);
    expect(container).toMatchSnapshot();
  });

  it('Should render unchecked and match the snapshot', () => {
    const { container } = render(<Checkbox checked={false} />);
    expect(container).toMatchSnapshot();
  });
});
