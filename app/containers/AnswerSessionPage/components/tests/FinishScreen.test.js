/**
 *
 * Tests for FinishScreen
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import FinishScreen from '../FinishScreen';

describe('<FinishScreen />', () => {
  const defaultProps = {
    selectAnswer: jest.fn(),
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<FinishScreen {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<FinishScreen {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
