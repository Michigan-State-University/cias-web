import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';

import ArrowDropdown from '../index';

describe('<ArrowDropdown />', () => {
  const defaultProps = {
    dropdownContent: <span>Content</span>,
    positionFrom: 'right',
    isOpened: true,
    setOpen: jest.fn(),
    width: '100%',
    childWidthScope: 'child',
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <ArrowDropdown {...defaultProps}>
        <div>Children</div>
      </ArrowDropdown>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot when is opened', () => {
    const { container } = render(
      <ArrowDropdown {...defaultProps}>
        <div>Children</div>
      </ArrowDropdown>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot when is closed', () => {
    const newProps = {
      ...defaultProps,
      isOpened: false,
    };
    const { container } = render(
      <ArrowDropdown {...newProps}>
        <div>Children</div>
      </ArrowDropdown>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot with different settings than default', () => {
    const newProps = {
      ...defaultProps,
      childWidthScope: 'parent',
      positionFrom: 'left',
    };
    const { container } = render(
      <ArrowDropdown {...newProps}>
        <div>Children</div>
      </ArrowDropdown>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should invoke onClick', () => {
    const { getByText } = render(
      <ArrowDropdown {...defaultProps}>
        <div>Children</div>
      </ArrowDropdown>,
    );
    const header = getByText('Content');
    fireEvent.click(header);
    expect(defaultProps.setOpen).toHaveBeenCalledWith(false);
  });
});
