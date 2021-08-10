/**
 *
 * Tests for Modal
 *
 */

import React from 'react';
import 'jest-styled-components';

import { testRender } from 'utils/testUtils';
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
    testRender(<Modal {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = testRender(<Modal {...props} />);
    expect(container).toMatchSnapshot();
  });
});
