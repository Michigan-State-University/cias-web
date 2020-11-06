/**
 *
 * Tests for FormikSelect
 *
 */

import React, { Fragment } from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';

import FormikSelect from '../index';

describe('<FormikSelect />', () => {
  let props;
  beforeAll(() => {
    props = {
      formikKey: 'test',
      placeholder: 'test',
      label: 'Label',
      options: [{ label: 'option', value: 'option' }],
    };
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Formik
        initialValues={{ test: { label: 'option', value: 'option' } }}
        onSubmit={jest.fn()}
      >
        {() => (
          <Fragment>
            <FormikSelect {...props} />
          </Fragment>
        )}
      </Formik>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Formik
        initialValues={{ test: { label: 'option', value: 'option' } }}
        onSubmit={jest.fn()}
      >
        {() => (
          <Fragment>
            <FormikSelect {...props} />
          </Fragment>
        )}
      </Formik>,
    );
    expect(container).toMatchSnapshot();
  });
});
