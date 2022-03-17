import React, { ComponentProps, memo, useCallback, useState } from 'react';
import Box from 'components/Box';

import { INPUT_PADDING } from './constants';
import Input from './index';
import { Adornment } from './styled';

type Props = ComponentProps<typeof Input> & { adornment?: string };

const Component = ({ adornment, ...props }: Props) => {
  const [adornmentSize, setAdornmentSize] = useState(0);
  const adornmentRef = useCallback(
    (node: HTMLElement) => {
      if (node) {
        setAdornmentSize(node.offsetWidth);
      } else {
        setAdornmentSize(0);
      }
    },
    [adornment],
  );

  return (
    <Box>
      <Input
        {...props}
        width="100%"
        pr={adornmentSize + INPUT_PADDING || undefined}
      />
      <Adornment
        ref={adornmentRef}
        ml={-(adornmentSize + INPUT_PADDING / 2)}
        visible={!!adornmentSize}
      >
        {adornment}
      </Adornment>
    </Box>
  );
};

export const InputWithAdornment = memo(Component);
