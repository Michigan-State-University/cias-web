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
  ...columnStyleProps
}) {
  const field = formikState.getFieldProps(formikKey);
  const meta = formikState.getFieldMeta(formikKey);

  const { value, onBlur, onChange } = field;
  const { error, touched } = meta;
  const hasError = Boolean(touched && error);

  return (
    <TransparentFormikInput
      error={error}
      hasError={hasError}
      inputProps={inputProps}
      label={label}
      name={formikKey}
      onBlur={onBlur}
      onChange={onChange}
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
  label: PropTypes.string,
  inputProps: PropTypes.object,
  children: PropTypes.node,
};

export default memo(FormikHookInput);
