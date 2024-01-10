import React, { ComponentProps, forwardRef } from 'react';

import { colors } from 'theme';

import Input from './index';

export type Props = {} & ComponentProps<typeof Input>;

export const DateInput = forwardRef<HTMLInputElement, Props>(
  ({ disabled, ...props }, ref) => (
    <Input
      disabled={disabled}
      mx={0}
      padding={12}
      textAlign="left"
      color={disabled ? colors.casper : colors.bluewood}
      {...props}
      ref={ref}
    />
  ),
);
