import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Dropdown from '../index';

const defaultProps = {
  options: [
    {
      id: 'id',
      label: 'Label',
      action: jest.fn(),
      colo: 'red',
    },
  ],
};

describe('<Dropdown />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(<Dropdown {...defaultProps} />)
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
