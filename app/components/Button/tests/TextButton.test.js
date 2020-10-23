import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import TextButton from '../TextButton';

describe('<Button />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<TextButton />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<TextButton />);
    expect(container).toMatchSnapshot();
  });

  it('Should render loading button and match the snapshot', () => {
    const { container } = render(<TextButton loading />);
    expect(container).toMatchSnapshot();
  });

  it('Should render disabled button and match the snapshot', () => {
    const { container } = render(<TextButton disabled />);
    expect(container).toMatchSnapshot();
  });
});
