/**
 *
 * Tests for Modal
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import Modal from '../index';

describe('<Modal />', () => {
  const props = {
    title: 'Test',
    visible: true,
    onClose: () => {},
  };
  let modalContainer;
  let mainAppContainer;
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);

    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
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
