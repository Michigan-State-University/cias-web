import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import SortableTree from '../index';

describe('<SortableTree />', () => {
  const defaultProps = {
    treeData: [
      { title: 'Chicken', children: [{ title: 'Egg' }] },
      { title: 'Fish', children: [{ title: 'Little Fish' }] },
    ],
  };

  it('Should render, not log errors in console and match the snapshot', () => {
    const spy = jest.spyOn(global.console, 'error');
    const { container } = render(<SortableTree {...defaultProps} />);

    expect(spy).not.toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
