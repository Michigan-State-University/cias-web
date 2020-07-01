/**
 *
 * FormikInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components/Input';
import { ErrorText } from './styled';

const inputMarginVertical = 20;

function FormikInput({
  values,
  errors,
  touched,
  formikKey,
  handleChange,
  hasMarginBottom,
  hasMarginTop,
  placeholder,
  handleBlur,
  ...rest
}) {
  const error = errors[formikKey];
  const hasError = touched[formikKey] && error;
  const value = values[formikKey];
  return (
    <>
      <Input
        mb={hasMarginBottom && !hasError ? inputMarginVertical : 5}
        mt={hasMarginTop && inputMarginVertical}
        placeholder={placeholder}
        value={value}
        name={formikKey}
        onChange={handleChange}
        onBlur={handleBlur}
        hasError={hasError}
        {...rest}
      />
      {hasError && <ErrorText margin={inputMarginVertical}>{error}</ErrorText>}
    </>
  );
}

FormikInput.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  formikKey: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  hasMarginBottom: PropTypes.bool,
  hasMarginTop: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
};

export default memo(FormikInput);
