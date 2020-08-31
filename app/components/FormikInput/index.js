/**
 *
 * FormikInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import { Input } from 'components/Input';
import Text from 'components/Text';
import Column from 'components/Column';

import { ErrorText } from './styled';

function FormikInput({
  formikKey,
  placeholder,
  type,
  label,
  inputProps,
  ...columnStyleProps
}) {
  const [field, meta] = useField(formikKey);
  const { value, onBlur, onChange } = field;
  const { error, touched } = meta;
  const hasError = touched && error;

  return (
    <Column {...columnStyleProps}>
      <Text mb={5}>{label}</Text>
      <Input
        mb={hasError ? 5 : null}
        placeholder={placeholder}
        value={value}
        name={formikKey}
        onChange={onChange}
        onBlur={onBlur}
        hasError={hasError}
        type={type}
        {...inputProps}
      />
      {hasError && <ErrorText>{error.toString()}</ErrorText>}
    </Column>
  );
}

FormikInput.propTypes = {
  formikKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  inputProps: PropTypes.object,
};

export default memo(FormikInput);
