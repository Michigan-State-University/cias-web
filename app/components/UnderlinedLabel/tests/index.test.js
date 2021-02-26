import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { UnderlinedLabel } from '../index';

describe('<UnderlinedLabel />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<UnderlinedLabel text="Test Label" />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<UnderlinedLabel text="Test Label" />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should render isActive and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<UnderlinedLabel text="Test Label" isActive />);

    expect(firstChild).toMatchSnapshot();
  });
});
