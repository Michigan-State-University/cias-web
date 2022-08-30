import React, {
  ComponentProps,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
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

  const inputRef = useRef<HTMLInputElement>();

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  return (
    <Box width="100%" display="flex" align="center">
      <Input
        {...props}
        ref={inputRef}
        hideNumberArrows
        width="100%"
        pr={adornmentSize + INPUT_PADDING || undefined}
      />
      <Adornment
        ref={adornmentRef}
        mr={INPUT_PADDING}
        visible={!!adornmentSize}
        onClick={focusInput}
      >
        {adornment}
      </Adornment>
    </Box>
  );
};

export const InputWithAdornment = memo(Component);
