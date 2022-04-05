import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';

import { TextArea } from './TextArea';
import { Sufix } from './styled';
import BaseStyledInput from './BaseStyledInput';

const DEFAULT_TEXT_PADDING = 25;
const DEFAULT_AVERAGE_LETTER_WIDTH = 8;

const StyledInput = (props) => {
  const [value, setValue] = useState(props.value);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (props.value !== value && hasFocus === false) setValue(props.value);
  }, [props.value, hasFocus]);

  const handleBlur = () => {
    setHasFocus(false);
    props.onBlur(value);
  };

  useEffect(() => {
    if (props.forceBlur) {
      handleBlur();
    }
  }, [props.forceBlur]);

  const onInputChange = (targetValue) => {
    if (props.validator && props.validator(targetValue)) {
      setValue(targetValue);
    } else if (!props.validator) setValue(targetValue);
  };

  const handleFocus = (event) => {
    if (props.onFocus) props.onFocus(event);

    setHasFocus(true);
  };

  // calculate approximate input width in pixels
  const calculateWidthFromText = (text) => {
    const calculatedWidth = text * props.averageLetterWidth + props.textPadding;
    if (typeof props.maxWidth === 'number')
      return Math.min(calculatedWidth, props.maxWidth);
    return calculatedWidth;
  };
  if (props.type === 'singleline' && !!props.sufix)
    return (
      <Box>
        <BaseStyledInput
          {...props}
          value={value}
          onInputChange={onInputChange}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          averageLetterWidth={props.averageLetterWidth}
          calculateWidthFromText={calculateWidthFromText}
        />
        {value && (
          <Sufix>
            <span>{value}</span>
            <span>{props.sufix}</span>
          </Sufix>
        )}
      </Box>
    );
  if (props.type === 'singleline')
    return (
      <BaseStyledInput
        {...props}
        value={value}
        onInputChange={onInputChange}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
        averageLetterWidth={props.averageLetterWidth}
        calculateWidthFromText={calculateWidthFromText}
      />
    );

  return (
    <TextArea
      {...props}
      maxWidth="initial"
      disabled={props.disabled}
      width={props.width || '100%'}
      height="60px"
      {...(props.rows ? { rows: props.rows, height: 'auto' } : {})}
      mr={9}
      value={value}
      onChange={(event) => onInputChange(event.target.value)}
      onInput={props.onInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
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
  onClick: PropTypes.func,
  autoSize: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  averageLetterWidth: PropTypes.number,
  textPadding: PropTypes.number,
  type: PropTypes.oneOf(['multiline', 'singleline']),
  rows: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transparent: PropTypes.bool,
  disabled: PropTypes.bool,
  forceBlur: PropTypes.bool,
  onInput: PropTypes.func,
  sufix: PropTypes.string,
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
