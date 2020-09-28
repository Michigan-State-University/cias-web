/**
 *
 * Tests for Modal
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import createModalForTests from 'utils/createModalForTests';

import Modal from '../index';

describe('<Modal />', () => {
  const props = {
    title: 'Test',
    visible: true,
    onClose: () => {},
  };

  beforeAll(() => {
    createModalForTests();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Modal {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<Modal {...props} />);
    expect(container).toMatchSnapshot();
  });
});
