import React from 'react';
import { useField } from 'formik';
import isNil from 'lodash/isNil';

import FormikControlLayout from 'components/FormikControlLayout';
import {
  InputWithAdornment,
  Props as InputWithAdornmentProps,
  AdornmentType,
} from 'components/Input/InputWithAdornment';

export type Props = {
  formikKey: string;
} & InputWithAdornmentProps;

const FormikInputWithAdornment = ({ formikKey, ...props }: Props) => {
  const [field, meta] = useField(formikKey);
  const { error, touched } = meta;

  const hasError = touched && !isNil(error);

  return (
    <FormikControlLayout touched={touched} error={error}>
      <InputWithAdornment {...field} {...props} hasError={hasError} />
    </FormikControlLayout>
  );
};

export default FormikInputWithAdornment;
export { AdornmentType };
