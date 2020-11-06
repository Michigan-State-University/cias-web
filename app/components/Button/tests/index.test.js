import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Button } from '../index';

describe('<Button />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Button />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });
});
