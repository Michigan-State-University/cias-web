import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import CollapsableLabel from '../CollapsableLabel';

describe('<CollapsableLabel />', () => {
  const props = {
    isOpened: true,
    onToggle: jest.fn(),
    label: 'test',
    onShowImg: '',
    onHideImg: '',
    imgWithBackground: true,
    index: 0,
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<CollapsableLabel {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = render(<CollapsableLabel {...props} />);
    expect(container).toMatchSnapshot();
  });
});
