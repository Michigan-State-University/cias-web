/**
 *
 * Tests for Popup
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Popup from '..';

describe('<Popup />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Popup popupContent={<>Test content</>}>
        <div>Test</div>
      </Popup>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
      rerender,
    } = render(
      <Popup popupContent={<>Test content</>}>
        <div>Test</div>
      </Popup>,
    );
    fireEvent.mouseEnter(firstChild);
    fireEvent.mouseLeave(firstChild);
    rerender(
      <Popup controlled popupContent={<>Test content</>}>
        <div>Test</div>
      </Popup>,
    );
    fireEvent.mouseEnter(firstChild);
    fireEvent.mouseLeave(firstChild);
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render and match the snapshot with different', () => {
    const {
      container: { firstChild },
    } = render(
      <Popup top right center popupContent={<>Test content</>}>
        <div>Test</div>
      </Popup>,
    );
    fireEvent.mouseEnter(firstChild);
    fireEvent.mouseLeave(firstChild);
    expect(firstChild).toMatchSnapshot();
  });
});
