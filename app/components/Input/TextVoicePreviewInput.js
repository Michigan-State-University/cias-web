import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components/Input/index';

const TextVoicePreviewInput = ({
  value,
  onInputChange,
  onBlur,
  placeholder,
  disabled,
  styles,
}) => (
  <>
    <Input
      value={value}
      onChange={event => onInputChange(event.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      transparent
      disabled={disabled}
      {...styles}
    />
  </>
);

TextVoicePreviewInput.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
};

export default TextVoicePreviewInput;
