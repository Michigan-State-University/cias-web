/**
 *
 * Tests for Radio
 *
 */

import React, { ComponentProps } from 'react';
import { render } from '@testing-library/react';

import Radio from '../index';

describe('<Radio />', () => {
  const props: ComponentProps<typeof Radio> = {
    id: 'test-radio',
    onChange: jest.fn(),
    checked: false,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Radio {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render checked and match the snapshot', () => {
    const { container } = render(<Radio {...props} checked />);
    expect(container).toMatchSnapshot();
  });

  it('Should render unchecked and match the snapshot', () => {
    const { container } = render(<Radio {...props} />);
    expect(container).toMatchSnapshot();
  });
});
