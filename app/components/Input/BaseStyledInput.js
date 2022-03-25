import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Input } from './index';

export const BaseStyledInput = ({
  value,
  onInputChange,
  handleBlur,
  handleFocus,
  averageLetterWidth,
  calculateWidthFromText,
  ...props
}) => (
  <Input
    {...props}
    textAlign={props.textAlign}
    value={value}
    onClick={(e) => {
      if (props.onClick) props.onClick(e);
      e.stopPropagation();
    }}
    onChange={(event) => onInputChange(event.target.value)}
    onBlur={handleBlur}
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
    px={undefined}
    pl={0}
    pr={props.sufix && value ? props.sufix.length * averageLetterWidth + 2 : 0}
  />
);

BaseStyledInput.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
  averageLetterWidth: PropTypes.number,
  calculateWidthFromText: PropTypes.func,
  placeholder: PropTypes.string,
  keyboard: PropTypes.string,
  textAlign: PropTypes.string,
  onClick: PropTypes.func,
  autoSize: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transparent: PropTypes.bool,
  sufix: PropTypes.string,
};

export default memo(BaseStyledInput);
