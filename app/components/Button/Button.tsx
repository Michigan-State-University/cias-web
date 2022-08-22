import React from 'react';

import { colors } from 'theme';

import Spinner from 'components/Spinner';

import { StyledButton } from './StyledButton';

type Props = {
  title?: string;
  loading?: boolean;
  inverted?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
} & Record<string, any>;

const Button = React.forwardRef<{}, Props>(
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

export { Button };

export default Button;
