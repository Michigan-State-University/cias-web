/**
 *
 * Tests for FormikCodeInput
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React, { Fragment } from 'react';
import { Formik } from 'formik';

import { testRender } from 'utils/testUtils';

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
    testRender(
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
    const { container } = testRender(
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
