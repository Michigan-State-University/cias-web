/**
 *
 * FormikNumberInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import isNil from 'lodash/isNil';

import { Input } from 'components/Input';
import { formatIncompletePhoneNumber } from 'libphonenumber-js/mobile';

import FormikControlLayout from 'components/FormikControlLayout';

function FormikNumberInput({
  formikKey,
  placeholder,
  type,
  label,
  inputProps,
  countryCode,
  required,
  ...columnStyleProps
}) {
  const [field, meta, helpers] = useField(formikKey);
  const { value, onBlur } = field;
  const { error, touched } = meta;
  const hasError = touched && !isNil(error) && (required || value.length > 0);
  const { setValue, setTouched } = helpers;

  const handleChange = (inputValue) => {
    setValue(
      formatIncompletePhoneNumber(inputValue.target.value, countryCode ?? 'US'),
    );
    setTouched(true, false);
  };

  return (
    <FormikControlLayout
      formikKey={formikKey}
      label={label}
      touched={touched}
      error={error}
      {...columnStyleProps}
    >
      <Input
        id={formikKey}
        placeholder={placeholder}
        value={value}
        name={formikKey}
        onChange={handleChange}
        onBlur={onBlur}
        hasError={hasError}
        keyboard={type}
        {...inputProps}
      />
    </FormikControlLayout>
  );
}

FormikNumberInput.propTypes = {
  formikKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  countryCode: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  inputProps: PropTypes.object,
  required: PropTypes.bool,
};

FormikNumberInput.defaultProps = {
  required: true,
};

export default memo(FormikNumberInput);
