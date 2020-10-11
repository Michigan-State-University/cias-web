/**
 *
 * Tests for List
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import { LI, UL } from '../index';

describe('<UL />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <UL>
        <LI>1</LI>
        <LI>2</LI>
        <LI>3</LI>
      </UL>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <UL>
        <LI>1</LI>
        <LI>2</LI>
        <LI>3</LI>
      </UL>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
