/**
 * Test dndUtils test utils
 */

import React from 'react';
import { render } from 'react-testing-library';

import { withDroppable } from 'utils/testUtils/dndUtils';

describe('dndUtils', () => {
  it('should render component inside', () => {
    const { queryByTestId } = render(
      withDroppable(<div data-testid="test-div" />),
    );

    const component = queryByTestId('test-div');

    expect(component).not.toBeNull();
  });
});
