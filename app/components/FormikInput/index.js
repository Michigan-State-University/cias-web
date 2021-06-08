/**
 *
 * FormikInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import InputComponent from './InputComponent';
import FormikHookInput from './FormikHookInput';

function FormikInput({
  formikKey,
  placeholder,
  type,
  label,
  inputProps,
  children,
  ...columnStyleProps
}) {
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

FormikInput.propTypes = {
  formikKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  inputProps: PropTypes.object,
  children: PropTypes.node,
};

export { FormikHookInput };
export default memo(FormikInput);
