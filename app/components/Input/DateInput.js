import React from 'react';
import PropTypes from 'prop-types';

import { StyledDateInput } from 'components/Input/styled';
import Text from 'components/Text';
import { colors } from 'theme';

const DateInput = React.forwardRef(
  ({ value, onClick, width, height, placeholder, fontSize }, ref) => (
    <StyledDateInput
      ref={ref}
      width={width}
      height={height}
      onClick={onClick}
      mx={10}
    >
      <Text textOpacity={0.6} color={colors.bluewood} fontSize={fontSize}>
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
};

export default DateInput;
