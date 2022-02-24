import React from 'react';
import { colors } from 'theme';

import Spinner from 'components/Spinner';
import { StyledButton } from './StyledButton';

type ButtonProps = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  inverted?: boolean;
  light?: boolean;
} & Record<string, unknown>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading,
      title,
      children,
      disabled,
      inverted = false,
      light = false,
      ...props
    }: ButtonProps,
    ref,
  ) => (
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
