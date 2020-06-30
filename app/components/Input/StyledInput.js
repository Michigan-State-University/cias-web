import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from './index';

const StyledInput = props => {
  const [value, setValue] = useState(props.value);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value !== value && hasFocus === false]);

  const onInputChange = targetValue => {
    if (props.validator && props.validator(targetValue)) {
      setValue(targetValue);
    } else if (!props.validator) setValue(targetValue);
  };

  const calculateWidthFromText = text => text * 8 + 25;

  return (
    <Input
      {...props}
      textAlign={props.textAlign}
      value={value}
      onChange={event => onInputChange(event.target.value)}
      onBlur={() => {
        setHasFocus(false);
        props.onBlur(value);
      }}
      onFocus={() => setHasFocus(true)}
      placeholder={props.placeholder}
      keyboard={props.keyboard}
      transparent
      {...(props.autoSize
        ? {
            width: `${calculateWidthFromText(
              value ? value.length : props.placeholder.length,
            )}px`,
          }
        : {})}
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
  autoSize: PropTypes.bool,
};

StyledInput.defaultProps = {
  keyboard: 'text',
  autoSize: false,
};

export { StyledInput };
