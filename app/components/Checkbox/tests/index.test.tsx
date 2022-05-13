/**
 *
 * Tests for Checkbox
 *
 */

import React, { ComponentProps } from 'react';
import { render } from '@testing-library/react';

import Checkbox from '../index';

describe('<Checkbox />', () => {
  const props: ComponentProps<typeof Checkbox> = {
    id: 'test-checkbox',
    onChange: jest.fn(),
    checked: false,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Checkbox {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render checked and match the snapshot', () => {
    const { container } = render(<Checkbox {...props} checked />);
    expect(container).toMatchSnapshot();
  });

  it('Should render unchecked and match the snapshot', () => {
    const { container } = render(<Checkbox {...props} />);
    expect(container).toMatchSnapshot();
  });
});
