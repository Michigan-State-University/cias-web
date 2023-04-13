import React, {
  ComponentProps,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Box from 'components/Box';

import { INPUT_PADDING } from './constants';
import Input from './index';
import { Adornment } from './styled';
import { AdornmentType } from './types';

export type Props = ComponentProps<typeof Input> & {
  adornmentType: AdornmentType;
  adornment?: string;
};

const Component = React.forwardRef<HTMLInputElement, Props>(
  ({ adornmentType, adornment, ...props }, ref) => {
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

    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const focusInput = useCallback(() => {
      innerRef.current?.focus();
    }, [innerRef.current]);

    return (
      <Box width="100%" display="flex" align="center" position="relative">
        <Input
          {...props}
          ref={innerRef}
          hideNumberArrows
          width="100%"
          pr={
            adornmentType === AdornmentType.SUFFIX
              ? adornmentSize + INPUT_PADDING
              : undefined
          }
          pl={
            adornmentType === AdornmentType.PREFIX ? adornmentSize : undefined
          }
        />
        <Adornment
          ref={adornmentRef}
          type={adornmentType}
          visible={!!adornmentSize}
          onClick={focusInput}
        >
          {adornment}
        </Adornment>
      </Box>
    );
  },
);

export const InputWithAdornment = memo(Component);
export { AdornmentType };
