import React, { memo } from 'react';
import { useField } from 'formik';
import isNil from 'lodash/isNil';
import { FormikHandlers } from 'formik/dist/types';

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
  onBlur?: FormikHandlers['handleBlur'];
} & InputWithAdornmentProps &
  Pick<FormikControlLayoutProps, 'label' | 'labelProps' | 'required'>;

const FormikInputWithAdornment = React.forwardRef<HTMLInputElement, Props>(
  // eslint-disable-next-line react/prop-types
  ({ formikKey, label, labelProps, required, onBlur, ...props }, ref) => {
    const [field, meta] = useField(formikKey);
    const { error, touched } = meta;

    const hasError = touched && !isNil(error);

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (...args) => {
      field.onBlur(...args);
      if (onBlur) {
        onBlur(...args);
      }
    };

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
          id={formikKey}
          onBlur={handleBlur}
        />
      </FormikControlLayout>
    );
  },
);

export default memo(FormikInputWithAdornment);
export { AdornmentType };
