import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import NewButton from '../NewButton';

describe('<NewButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<NewButton />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<NewButton />);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the loading snapshot', () => {
    const {
      container: { firstChild },
    } = render(<NewButton loading />);
    expect(firstChild).toMatchSnapshot();
  });
});
