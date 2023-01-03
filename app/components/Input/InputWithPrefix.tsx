import React, { ComponentProps, memo, useRef } from 'react';
import Box from 'components/Box';

import Input from './index';

type Props = ComponentProps<typeof Input> & { prefix?: string };

const Component = ({ prefix, ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <Box width="100%" display="flex" align="center">
      <Input
        {...props}
        value={`${prefix}${props.value.slice(prefix.length)}`}
        ref={inputRef}
        hideNumberArrows
        width="100%"
      />
    </Box>
  );
};

export const InputWithPrefix = memo(Component);
