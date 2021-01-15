/**
 *
 * Tests for FormikCodeInput
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React, { Fragment } from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';

import FormikCodeInput from '../index';

describe('<FormikCodeInput />', () => {
  let props;
  beforeAll(() => {
    props = {
      formikKey: 'test',
      placeholder: 'test',
      type: 'text',
      label: 'Label',
    };
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        {() => (
          <>
            <FormikCodeInput {...props} />
          </>
        )}
      </Formik>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        {() => (
          <>
            <FormikCodeInput {...props} />
          </>
        )}
      </Formik>,
    );
    expect(container).toMatchSnapshot();
  });
});
