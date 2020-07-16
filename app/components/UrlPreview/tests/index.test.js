/**
 *
 * Tests for UrlPreview
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import 'jest-styled-components';

import renderer from 'react-test-renderer';
import UrlPreview from '../index';

describe('<UrlPreview />', () => {
  it('Should render and match the snapshot', () => {
    const renderedComponent = renderer.create(<UrlPreview />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
