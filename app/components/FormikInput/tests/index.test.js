/**
 *
 * Tests for FormikInput
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import FormikInput from '../index';

describe('<FormikInput />', () => {
  let props;
  beforeAll(() => {
    props = {
      values: {
        test: 'test',
      },
      errors: {},
      touched: {
        test: true,
      },
      formikKey: 'test',
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      placeholder: 'test',
    };
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<FormikInput {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<FormikInput {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
