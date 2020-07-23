/**
 *
 * Tests for FormikInput
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React, { Fragment } from 'react';
import { render } from 'react-testing-library';
import { Formik } from 'formik';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import FormikInput from '../index';

describe('<FormikInput />', () => {
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
          <Fragment>
            <FormikInput {...props} />
          </Fragment>
        )}
      </Formik>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        {() => (
          <Fragment>
            <FormikInput {...props} />
          </Fragment>
        )}
      </Formik>,
    );
    expect(container).toMatchSnapshot();
  });
});
