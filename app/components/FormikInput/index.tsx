/**
 *
 * FormikInput
 *
 */

import React, { memo, ReactElement } from 'react';
import { useField } from 'formik';
import isNil from 'lodash/isNil';

import InputComponent from './InputComponent';
import FormikHookInput from './FormikHookInput';

type FormikInputType = {
  formikKey: string;
  placeholder?: string;
  type?: string;
  label?: string | ReactElement;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  children?: ReactElement;
  validator?: (value: string) => boolean;
  disabled?: boolean;
  hideErrorMessages?: boolean;
} & Record<string, unknown>;

function FormikInput({
  formikKey,
  placeholder,
  type,
  label,
  inputProps,
  children,
  validator,
  disabled,
  hideErrorMessages,
  ...columnStyleProps
}: FormikInputType) {
  const [field, meta, helper] = useField(formikKey);
  const { value, onBlur, onChange } = field;
  const { error, touched } = meta;
  const { setValue } = helper;
  const hasError = touched && !isNil(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validator && validator(e.target.value)) {
      setValue(e.target.value);
    }
  };

  return (
    <InputComponent
      error={error}
      hasError={hasError}
      touched={touched}
      inputProps={inputProps}
      label={label}
      name={formikKey}
      onBlur={onBlur}
      onChange={validator ? handleChange : onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      disabled={disabled}
      hideErrorMessages={hideErrorMessages}
      {...columnStyleProps}
    >
      {children}
    </InputComponent>
  );
}

export { FormikHookInput };
export default memo(FormikInput);
