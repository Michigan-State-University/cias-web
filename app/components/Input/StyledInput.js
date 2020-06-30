import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from './index';

const TEXT_PADDING = 25;
const AVERAGE_LETTER_WIDTH = 8;

const StyledInput = props => {
  const [value, setValue] = useState(props.value);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (props.value !== value && hasFocus === false) setValue(props.value);
  }, [props.value, hasFocus]);

  const onInputChange = targetValue => {
    if (props.validator && props.validator(targetValue)) {
      setValue(targetValue);
    } else if (!props.validator) setValue(targetValue);
  };

  // calculate approximate input width in pixels
  const calculateWidthFromText = text =>
    text * AVERAGE_LETTER_WIDTH + TEXT_PADDING;

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
      width={
        props.autoSize &&
        `${calculateWidthFromText(
          value ? value.length : props.placeholder.length,
        )}px`
      }
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
