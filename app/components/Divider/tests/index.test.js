/**
 *
 * Tests for Divider
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import renderer from 'react-test-renderer';
import Divider from '../index';

describe('<Divider />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Divider />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const renderedComponent = renderer.create(<Divider />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
