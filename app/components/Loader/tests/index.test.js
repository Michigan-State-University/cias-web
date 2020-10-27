/**
 *
 * Tests for Spinner
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import Loader from '../index';

describe('<Loader />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Loader />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const renderedComponent = render(<Loader />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Should render with invalid type and match the snapshot', () => {
    const renderedComponent = render(<Loader type="invalid" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Should render loader of appropriate type', () => {
    const fullScreenLoaderComponent = render(<Loader type="absolute" />);
    const inlineLoaderComponent = render(<Loader type="inline" />);

    const fullScreenLoader = fullScreenLoaderComponent.getByTestId(
      'fullscreen-loader',
    );
    const inlineLoader = inlineLoaderComponent.getByTestId('inline-loader');

    expect(fullScreenLoader).not.toEqual(null);
    expect(inlineLoader).not.toEqual(null);
  });
});
