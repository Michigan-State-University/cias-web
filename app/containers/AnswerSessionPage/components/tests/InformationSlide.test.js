/**
 *
 * Tests for InformationSlide
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import InformationSlide from '../InformationSlide';

describe('<InformationSlide />', () => {
  const defaultProps = {
    selectAnswer: jest.fn(),
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<InformationSlide {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<InformationSlide {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
