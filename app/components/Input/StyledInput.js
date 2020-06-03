import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from './index';

const StyledInput = props => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onInputChange = targetValue => {
    if (props.validator && props.validator(targetValue)) {
      setValue(targetValue);
    } else if (!props.validator) setValue(targetValue);
  };

  return (
    <Input
      {...props}
      textAlign={props.textAlign}
      value={value}
      onChange={event => onInputChange(event.target.value)}
      onBlur={() => props.onBlur(value)}
      placeholder={props.placeholder}
      keyboard={props.keyboard}
      transparent
    />
  );
};

StyledInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  keyboard: PropTypes.string,
  validator: PropTypes.func,
  textAlign: PropTypes.string,
  onBlur: PropTypes.func,
};

StyledInput.defaultProps = {
  keyboard: 'text',
};

export { StyledInput };
