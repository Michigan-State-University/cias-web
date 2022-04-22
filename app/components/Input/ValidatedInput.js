import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components/Input/index';

const ValidatedInput = ({
  value,
  onChange,
  onValidatorError,
  validator,
  disabled,
  placeholder,
}) => {
  const [currentValue, setCurrentValue] = useState('');

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

  const handleBlur = () => {
    if (validator) {
      const validatorResult = validator(currentValue);
      if (validatorResult) onChange(currentValue);
      else onValidatorError(validatorResult);
    } else onChange(currentValue);
  };

  return (
    <Input
      defaultValue={value}
      width="100%"
      value={currentValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      transparent
      disabled={disabled}
    />
  );
};

ValidatedInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  validator: PropTypes.func,
  onValidatorError: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default ValidatedInput;
