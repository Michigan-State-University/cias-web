import React from 'react';
import times from 'lodash/times';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';

import Accordion from '../index';

const singleChild = index => (
  <div key={index} label={`Label${index}`} color="red">
    {`Content${index}`}
  </div>
);

const multipleChildren = () => times(3, index => singleChild(index));

describe('<Accordion />', () => {
  const defaultProps = {
    onHide: jest.fn(),
    onOpen: jest.fn(),
    onReorder: jest.fn(),
    setOpened: jest.fn(),
    onDelete: jest.fn(),
    opened: -1,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Accordion {...defaultProps}>{multipleChildren()}</Accordion>);
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render only one element and match the snapshot', () => {
    const { container } = render(
      <Accordion {...defaultProps}>{singleChild(0)}</Accordion>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render multiple elements and match the snapshot', () => {
    const { container } = render(
      <Accordion {...defaultProps}>{multipleChildren()}</Accordion>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render with one element opened and match the snapshot', () => {
    const newProps = { ...defaultProps, opened: 0 };
    const { container } = render(
      <Accordion {...newProps}>{multipleChildren()}</Accordion>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should open accordion', () => {
    const { getByText } = render(
      <Accordion {...defaultProps}>{multipleChildren()}</Accordion>,
    );
    const secondEl = getByText('Label1');
    fireEvent.click(secondEl);
    expect(defaultProps.setOpened).toHaveBeenCalledWith(1);
  });

  it('Should close accordion', () => {
    const newProps = { ...defaultProps, opened: 1 };
    const { getByText } = render(
      <Accordion {...newProps}>{multipleChildren()}</Accordion>,
    );
    const secondEl = getByText('Label1');
    fireEvent.click(secondEl);
    expect(defaultProps.setOpened).toHaveBeenCalledWith(-1);
    expect(defaultProps.onHide).toHaveBeenCalledWith(1);
  });

  it('Should change opened accordion', () => {
    const newProps = { ...defaultProps, opened: 1 };
    const { getByText } = render(
      <Accordion {...newProps}>{multipleChildren()}</Accordion>,
    );
    const thirdEl = getByText('Label2');
    fireEvent.click(thirdEl);
    expect(defaultProps.setOpened).toHaveBeenCalledWith(2);
    expect(defaultProps.onHide).toHaveBeenCalledWith(1);
  });

  it('Should invoke onDelete function', () => {
    const { getByTestId } = render(
      <Accordion {...defaultProps}>{multipleChildren()}</Accordion>,
    );
    const thirdEl = getByTestId('bin-Label2');
    fireEvent.click(thirdEl);
    expect(defaultProps.onDelete).toHaveBeenCalledWith(2);
  });
});
