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
  light?: boolean;
} & Record<string, any>;

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ loading, title, children, disabled, inverted, light, ...props }, ref) => (
    <StyledButton
      disabled={disabled || loading}
      inverted={inverted}
      light={light}
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
