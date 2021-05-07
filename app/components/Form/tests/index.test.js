/**
 *
 * Tests for Form
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Form from '../index';

describe('<Form />', () => {
  it('Should render, match the snapshot and not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const { container } = render(<Form checked />);
    expect(spy).not.toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
