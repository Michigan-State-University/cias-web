import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import NewFloatButton from '../NewFloatButton';

describe('<NewFloatButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<NewFloatButton />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<NewFloatButton />);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the loading snapshot', () => {
    const {
      container: { firstChild },
    } = render(<NewFloatButton loading />);
    expect(firstChild).toMatchSnapshot();
  });
});
