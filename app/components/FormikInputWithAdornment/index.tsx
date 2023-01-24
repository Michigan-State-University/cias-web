import React from 'react';
import { useField } from 'formik';
import isNil from 'lodash/isNil';

import FormikControlLayout, {
  Props as FormikControlLayoutProps,
} from 'components/FormikControlLayout';
import {
  InputWithAdornment,
  Props as InputWithAdornmentProps,
  AdornmentType,
} from 'components/Input/InputWithAdornment';

export type Props = {
  formikKey: string;
} & InputWithAdornmentProps &
  Pick<FormikControlLayoutProps, 'label' | 'labelProps' | 'required'>;

const FormikInputWithAdornment = React.forwardRef<HTMLInputElement, Props>(
  // eslint-disable-next-line react/prop-types
  ({ formikKey, label, labelProps, required, ...props }, ref) => {
    const [field, meta] = useField(formikKey);
    const { error, touched } = meta;

    const hasError = touched && !isNil(error);

    return (
      <FormikControlLayout
        touched={touched}
        error={error}
        formikKey={formikKey}
        label={label}
        labelProps={labelProps}
        required={required}
      >
        <InputWithAdornment
          {...field}
          {...props}
          hasError={hasError}
          ref={ref}
        />
      </FormikControlLayout>
    );
  },
);

export default FormikInputWithAdornment;
export { AdornmentType };
