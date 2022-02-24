/**
 *
 * FormikInput
 *
 */

import React, { memo, ReactElement } from 'react';
import { useField } from 'formik';

import InputComponent from './InputComponent';
import FormikHookInput from './FormikHookInput';

type FormikInputType = {
  formikKey: string;
  placeholder?: string;
  type?: string;
  label?: string;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  children?: ReactElement;
} & Record<string, unknown>;

function FormikInput({
  formikKey,
  placeholder,
  type,
  label,
  inputProps,
  children,
  ...columnStyleProps
}: FormikInputType) {
  const [field, meta] = useField(formikKey);
  const { value, onBlur, onChange } = field;
  const { error, touched } = meta;
  const hasError = Boolean(touched && error);

  return (
    <InputComponent
      error={error}
      hasError={hasError}
      inputProps={inputProps}
      label={label}
      name={formikKey}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      {...columnStyleProps}
    >
      {children}
    </InputComponent>
  );
}

export { FormikHookInput };
export default memo(FormikInput);
