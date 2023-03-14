/**
 *
 * Tests for InequalityChooser
 *
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';

import { testRender } from 'utils/testUtils';

import InequalityChooser from '../index';

describe('<InequalityChooser />', () => {
  const defaultProps = {
    onSuccessfulChange: jest.fn(),
    inequalityValue: '=5',
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    testRender(<InequalityChooser {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = testRender(<InequalityChooser {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should call onSuccessfulChange correctly', async () => {
    const { getByTestId, getByText } = testRender(
      <InequalityChooser {...defaultProps} />,
    );

    const newSign = '<';

    const select = getByTestId('select').querySelector('input');
    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: 'ArrowDown', code: 40 });
    const option1 = getByText(newSign);
    fireEvent.click(option1);
    await waitFor(() =>
      expect(defaultProps.onSuccessfulChange).toHaveBeenCalledWith(
        `${newSign}5`,
      ),
    );

    const newValue = 10;

    const numericInput = getByTestId('input');
    fireEvent.change(numericInput, { target: { value: newValue } });
    fireEvent.blur(numericInput);
    await waitFor(() =>
      expect(defaultProps.onSuccessfulChange).toHaveBeenCalledWith(
        `=5${newValue}`,
      ),
    );
  });
});
