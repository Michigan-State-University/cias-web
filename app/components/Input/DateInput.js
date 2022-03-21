import React from 'react';
import PropTypes from 'prop-types';

import { StyledDateInput } from 'components/Input/styled';
import Text from 'components/Text';
import { colors } from 'theme';

const DateInput = React.forwardRef(
  (
    {
      value,
      onClick,
      width,
      height,
      placeholder,
      fontSize,
      disabled,
      inputStyles,
    },
    ref,
  ) => (
    <StyledDateInput
      data-private
      disabled={disabled}
      ref={ref}
      width={width}
      height={height}
      onClick={onClick}
      mx={10}
      {...inputStyles}
    >
      <Text
        textOpacity={0.6}
        color={value ? colors.black : colors.bluewood}
        fontSize={fontSize}
      >
        {value || placeholder}
      </Text>
    </StyledDateInput>
  ),
);

DateInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  placeholder: PropTypes.string,
  fontSize: PropTypes.number,
  disabled: PropTypes.bool,
  inputStyles: PropTypes.object,
};

export default DateInput;
