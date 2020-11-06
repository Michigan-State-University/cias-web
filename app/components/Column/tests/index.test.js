import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Column, { calculateWidth, getWidthString } from '../index';

describe('<Column />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Column />);
    expect(container).toMatchSnapshot();
  });

  it('should return correct width of columns', () => {
    expect(calculateWidth(6)).toEqual(50);
  });
  it('should return undefined width of columns if no parameter is passed', () => {
    expect(calculateWidth()).toEqual(undefined);
  });
  it('should return correct string', () => {
    expect(getWidthString(6)).toEqual('width: 50%;');
  });
  it('should return undefined string if no parameter is passed', () => {
    expect(getWidthString()).toEqual('');
  });
});
