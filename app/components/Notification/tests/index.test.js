import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Notification from '../index';

describe('<Notification />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Notification title="Test title!" description="Test description" />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <Notification title="Test title!" description="Test description" />,
    );
    expect(container).toMatchSnapshot();
  });
});
