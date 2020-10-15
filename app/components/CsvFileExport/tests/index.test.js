/**
 *
 * Tests for CsvFileExport
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import CsvFileExport from '../index';

const defaultProps = {
  data: [{ email: 'test@text.com' }],
  filename: 'file',
};

describe('<CsvFileReader />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<CsvFileExport {...defaultProps}>Export CSV</CsvFileExport>);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <CsvFileExport {...defaultProps}>Export CSV</CsvFileExport>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should export the file', () => {
    const { getByText } = render(
      <CsvFileExport {...defaultProps}>Export CSV</CsvFileExport>,
    );
    const row = getByText('Export CSV');
    expect(fireEvent.click(row)).toBe(true);
  });
});
