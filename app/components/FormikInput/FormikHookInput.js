/**
 *
 * FormikHookInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormikProps } from 'formik';

import TransparentFormikInput from './TransparentFormikInput';

function FormikHookInput({
  formikKey,
  formikState,
  type,
  label,
  inputProps,
  children,
  onBlur,
  onChange,
  ...columnStyleProps
}) {
  const field = formikState.getFieldProps(formikKey);
  const meta = formikState.getFieldMeta(formikKey);

  const { validateOnMount } = formikState;
  const { value, onBlur: onFormikBlur, onChange: onFormikChange } = field;
  const { error, touched } = meta;

  const shouldValidate = validateOnMount || touched;
  const hasError = Boolean(shouldValidate && error);

  const handleBlur = (event) => {
    onFormikBlur(event);
    if (onBlur) onBlur(event);
  };

  const handleChange = (event) => {
    onFormikChange(event);
    if (onChange) onChange(event);
  };

  return (
    <TransparentFormikInput
      error={error}
      touched={touched}
      hasError={hasError}
      inputProps={inputProps}
      label={label}
      id={formikKey}
      onBlur={handleBlur}
      onChange={handleChange}
      type={type}
      value={value}
      {...columnStyleProps}
    >
      {children}
    </TransparentFormikInput>
  );
}

FormikHookInput.propTypes = {
  formikKey: PropTypes.string.isRequired,
  formikState: PropTypes.shape(FormikProps).isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  inputProps: PropTypes.object,
  children: PropTypes.node,
  transparent: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

export default memo(FormikHookInput);
