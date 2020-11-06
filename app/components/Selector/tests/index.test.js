/**
 *
 * Tests for Selector
 *
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import Selector from '../index';

const defaultProps = {
  options: [
    { label: 'Label', id: 'asd02as' },
    { label: 'Label2', id: 'as0-12ds' },
  ],
  activeOption: { label: 'Label', id: 'asd02as' },
  tooltipContent: 'tooltipContent',
};

describe('<Selector />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Selector {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<Selector {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render disabled and match the snapshot', () => {
    const { getByText, container } = render(<Selector {...defaultProps} />);
    const header = getByText('Label');
    fireEvent.click(header);

    expect(container).toMatchSnapshot();
  });
});
