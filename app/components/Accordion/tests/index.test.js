import React from 'react';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';
import times from 'lodash/times';
import { render, fireEvent } from '@testing-library/react';
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
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Accordion {...defaultProps}>{multipleChildren()}</Accordion>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render only one element and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Accordion {...defaultProps}>{singleChild(0)}</Accordion>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render multiple elements and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Accordion {...defaultProps}>{multipleChildren()}</Accordion>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render with one element opened and match the snapshot', () => {
    const newProps = { ...defaultProps, opened: 0 };
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Accordion {...newProps}>{multipleChildren()}</Accordion>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should open accordion', () => {
    const { getByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Accordion {...defaultProps}>{multipleChildren()}</Accordion>
      </IntlProvider>,
    );
    const secondEl = getByText('Label1');
    fireEvent.click(secondEl);
    expect(defaultProps.setOpened).toHaveBeenCalledWith(1);
  });

  it('Should close accordion', () => {
    const newProps = { ...defaultProps, opened: 1 };
    const { getByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Accordion {...newProps}>{multipleChildren()}</Accordion>
      </IntlProvider>,
    );
    const secondEl = getByText('Label1');
    fireEvent.click(secondEl);
    expect(defaultProps.setOpened).toHaveBeenCalledWith(-1);
    expect(defaultProps.onHide).toHaveBeenCalledWith(1);
  });

  it('Should change opened accordion', () => {
    const newProps = { ...defaultProps, opened: 1 };
    const { getByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Accordion {...newProps}>{multipleChildren()}</Accordion>
      </IntlProvider>,
    );
    const thirdEl = getByText('Label2');
    fireEvent.click(thirdEl);
    expect(defaultProps.setOpened).toHaveBeenCalledWith(2);
    expect(defaultProps.onHide).toHaveBeenCalledWith(1);
  });

  it('Should invoke onDelete function', () => {
    const { getByTestId } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Accordion {...defaultProps}>{multipleChildren()}</Accordion>
      </IntlProvider>,
    );
    const thirdEl = getByTestId('bin-Label2');
    fireEvent.click(thirdEl);
    expect(defaultProps.onDelete).toHaveBeenCalledWith(2);
  });
});
