import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { ScrollFogBox } from 'components/Box/ScrollFog';

describe('<ScrollFog />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ScrollFogBox />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<ScrollFogBox />);
    expect(container).toMatchSnapshot();
  });
});
