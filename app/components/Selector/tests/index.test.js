/**
 *
 * Tests for Selector
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
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
});
