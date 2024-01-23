import React, { ComponentProps, forwardRef, SyntheticEvent } from 'react';

import { colors } from 'theme';

import Input from './index';
import { addSeparatorsToDateString } from './utils';

export type Props = {} & ComponentProps<typeof Input>;

export const DateInput = forwardRef<HTMLInputElement, Props>(
  ({ disabled, onInput, ...props }, ref) => {
    const handleInput = (
      event: SyntheticEvent<HTMLInputElement, InputEventInit>,
    ) => {
      if (
        event.nativeEvent.inputType &&
        !['deleteContentBackward', 'deleteContentForward'].includes(
          event.nativeEvent.inputType,
        )
      ) {
        const inputElement = event.target as HTMLInputElement;
        const modifiedValue = addSeparatorsToDateString(
          inputElement.value,
          '/',
        );
        if (modifiedValue !== inputElement.value) {
          inputElement.value = modifiedValue;
        }
      }

      onInput?.(event);
    };

    return (
      <Input
        disabled={disabled}
        mx={0}
        padding={12}
        textAlign="left"
        inputMode="numeric"
        type="number"
        color={disabled ? colors.casper : colors.bluewood}
        {...props}
        onInput={handleInput}
        ref={ref}
      />
    );
  },
);
