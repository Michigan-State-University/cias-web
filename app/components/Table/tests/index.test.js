import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Table } from '../index';

describe('<Table />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Table />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
