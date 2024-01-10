import React, { ComponentProps, forwardRef, KeyboardEventHandler } from 'react';

import { colors } from 'theme';

import Input from './index';

export type Props = {} & ComponentProps<typeof Input>;

export const DateInput = forwardRef<HTMLInputElement, Props>(
  ({ disabled, onKeyUp, ...props }, ref) => {
    const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
      console.log(event);

      if (!['Backspace', 'Delete'].includes(event.key)) {
        const mappedEvent = event.target as HTMLInputElement;
        const { value } = mappedEvent;
        const { length } = value;
        const hyphensPositions = [2, 5];

        const splitValue = value.split('-');

        const endsWithHyphen = !splitValue[splitValue.length - 1];
        const hyphensCount = splitValue.length - 1;

        if (
          !endsWithHyphen &&
          hyphensCount < 2 &&
          hyphensPositions.includes(length) // TODO change to checking split groups
        ) {
          mappedEvent.value += '-';
        }
      }

      onKeyUp?.(event);
    };

    return (
      <Input
        disabled={disabled}
        mx={0}
        padding={12}
        textAlign="left"
        color={disabled ? colors.casper : colors.bluewood}
        {...props}
        onKeyUp={handleKeyUp}
        ref={ref}
      />
    );
  },
);
