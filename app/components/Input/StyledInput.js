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

  const handleFocus = () => {
    if (props.onFocus) props.onFocus();

    setHasFocus(true);
  };

  // calculate approximate input width in pixels
  const calculateWidthFromText = text => {
    const calculatedWidth = text * props.averageLetterWidth + props.textPadding;
    if (typeof props.maxWidth === 'number')
      return Math.min(calculatedWidth, props.maxWidth);
    return calculatedWidth;
  };
  if (props.type === 'singleline')
    return (
      <Input
        {...props}
        textAlign={props.textAlign}
        value={value}
        onClick={e => e.stopPropagation()}
        onChange={event => onInputChange(event.target.value)}
        onBlur={() => {
          setHasFocus(false);
          props.onBlur(value);
        }}
        onFocus={handleFocus}
        placeholder={props.placeholder}
        keyboard={props.keyboard}
        transparent={props.transparent}
        width={
          props.autoSize
            ? `${calculateWidthFromText(
                value ? value.length : props.placeholder.length,
              )}px`
            : props.width
        }
      />
    );

  return (
    <TextArea
      disabled={props.disabled}
      width={props.width || '100%'}
      height="60px"
      {...(props.rows ? { rows: props.rows, height: 'auto' } : {})}
      mr={9}
      value={value}
      onChange={event => onInputChange(event.target.value)}
      onInput={props.onInput}
      onFocus={handleFocus}
      onBlur={() => {
        setHasFocus(false);
        props.onBlur(value);
      }}
      placeholder={props.placeholder}
      transparent={props.transparent}
      data-cy="text-area"
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
  onFocus: PropTypes.func,
  autoSize: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  averageLetterWidth: PropTypes.number,
  textPadding: PropTypes.number,
  type: PropTypes.oneOf(['multiline', 'singleline']),
  rows: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transparent: PropTypes.bool,
  disabled: PropTypes.bool,
  onInput: PropTypes.func,
};

StyledInput.defaultProps = {
  keyboard: 'text',
  autoSize: false,
  maxWidth: 200,
  averageLetterWidth: DEFAULT_AVERAGE_LETTER_WIDTH,
  textPadding: DEFAULT_TEXT_PADDING,
  type: 'singleline',
  transparent: true,
};

export { StyledInput };

export default StyledInput;
