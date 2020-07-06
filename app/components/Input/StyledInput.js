import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from './index';
import { TextArea } from './TextArea';

const DEFAULT_TEXT_PADDING = 25;
const DEFAULT_AVERAGE_LETTER_WIDTH = 8;

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
    Math.min(
      text * props.averageLetterWidth + props.textPadding,
      props.maxWidth,
    );

  if (props.type === 'singleline')
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
          props.autoSize
            ? `${calculateWidthFromText(
                value ? value.length : props.placeholder.length,
              )}px`
            : null
        }
      />
    );

  return (
    <TextArea
      width="100%"
      height="60px"
      {...(props.rows ? { rows: props.rows, height: 'auto' } : {})}
      mr={9}
      value={value}
      onChange={event => onInputChange(event.target.value)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => {
        setHasFocus(false);
        props.onBlur(value);
      }}
      placeholder={props.placeholder}
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
  autoSize: PropTypes.bool,
  maxWidth: PropTypes.number,
  averageLetterWidth: PropTypes.number,
  textPadding: PropTypes.number,
  type: PropTypes.oneOf(['multiline', 'singleline']),
  rows: PropTypes.string,
};

StyledInput.defaultProps = {
  keyboard: 'text',
  autoSize: false,
  maxWidth: 200,
  averageLetterWidth: DEFAULT_AVERAGE_LETTER_WIDTH,
  textPadding: DEFAULT_TEXT_PADDING,
  type: 'singleline',
};

export { StyledInput };
