/**
 *
 * FormikNumberInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import { Input } from 'components/Input';
import Text from 'components/Text';
import { formatIncompletePhoneNumber } from 'libphonenumber-js/mobile';

import Column from 'components/Column';
import { ErrorText } from './styled';

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
  const hasError = touched && error && (required || value.length > 0);
  const { setValue, setTouched } = helpers;

  const handleChange = (inputValue) => {
    setValue(
      formatIncompletePhoneNumber(inputValue.target.value, countryCode ?? 'US'),
    );
    setTouched(true, false);
  };

  return (
    <Column {...columnStyleProps}>
      {label && (
        <label htmlFor={formikKey}>
          <Text mb={5} width="fit-content">
            {label}
          </Text>
        </label>
      )}

      <Input
        id={formikKey}
        mb={hasError ? 5 : null}
        placeholder={placeholder}
        value={value}
        name={formikKey}
        onChange={handleChange}
        onBlur={onBlur}
        hasError={hasError}
        keyboard={type}
        {...inputProps}
      />
      {hasError && <ErrorText>{error.toString()}</ErrorText>}
    </Column>
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
