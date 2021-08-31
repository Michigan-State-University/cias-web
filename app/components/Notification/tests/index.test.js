import React from 'react';
import 'jest-styled-components';

import { testRender } from 'utils/testUtils';

import Notification from '../index';

describe('<Notification />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    testRender(
      <Notification title="Test title!" description="Test description" />,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = testRender(
      <Notification title="Test title!" description="Test description" />,
    );
    expect(container).toMatchSnapshot();
  });
});
