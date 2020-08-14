/**
 *
 * Tests for UploadFileButton
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';

import UploadFileButton from '../index';

const defaultProps = {
  icon: 'icon.svg',
  onUpload: jest.fn(),
};

describe('<UploadFileButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<UploadFileButton {...defaultProps}>Upload</UploadFileButton>);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <UploadFileButton {...defaultProps}>Upload</UploadFileButton>,
    );
    expect(container).toMatchSnapshot();
  });
});
