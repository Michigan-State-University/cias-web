import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'theme';

import Spinner from 'components/Spinner';
import { StyledButton } from './StyledButton';
// @ts-ignore
const Button = React.forwardRef(
  ({ loading, title, children, disabled, inverted, ...props }, ref) => (
    <StyledButton
      disabled={disabled || loading}
      inverted={inverted}
      {...props}
      ref={ref}
    >
      {!loading && (title || children)}
      {loading && <Spinner color={inverted ? colors.grey : colors.white} />}
    </StyledButton>
  ),
);

Button.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  inverted: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export { Button };

export default Button;
