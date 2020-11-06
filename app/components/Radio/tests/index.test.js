/**
 *
 * Tests for Radio
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Radio from '../index';

describe('<Radio />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Radio />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render checked and match the snapshot', () => {
    const { container } = render(<Radio checked />);
    expect(container).toMatchSnapshot();
  });

  it('Should render unchecked and match the snapshot', () => {
    const { container } = render(<Radio checked={false} />);
    expect(container).toMatchSnapshot();
  });
});
