import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Circle from '../index';
import PlusCircle from '../PlusCircle';

describe('<Circle />', () => {
  it('circle should match the snapshot', () => {
    const renderedComponent = render(<Circle child={2} />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('plus circle should match the snapshot', () => {
    const renderedComponent = render(<PlusCircle />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
