/**
 *
 * Tests for UrlPreview
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import 'jest-styled-components';

import { render } from 'react-testing-library';
import UrlPreview from '../index';

describe('<UrlPreview />', () => {
  it('Should render and match the snapshot', () => {
    const { container } = render(<UrlPreview />);
    expect(container).toMatchSnapshot();
  });
});
