/**
 *
 * Tests for ElementsContainer
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';

import ElementsContainer from '../ElementsContainer';

const defaultProps = {
  options: [{ label: 'Label', id: '1' }, { label: 'Label2', id: '2' }],
  selectedOption: { label: 'Label', id: '1' },
  setOption: jest.fn(),
  toggleActive: jest.fn(),
};

describe('<ElementsContainer />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ElementsContainer {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<ElementsContainer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should call correct functions', () => {
    const { getByText } = render(<ElementsContainer {...defaultProps} />);
    const header = getByText('Label2');
    fireEvent.click(header);
    expect(defaultProps.setOption).toHaveBeenCalledWith('2');
    expect(defaultProps.toggleActive).toHaveBeenCalled();
  });
});
