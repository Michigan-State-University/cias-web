import React from 'react';

import Icon from 'components/Icon';

import TextButton from './TextButton';

type Props = {
  title: string;
  src: string;
  fill?: string;
  stroke?: string;
  onClick: () => void;
  loading?: boolean;
  disabled: boolean;
} & Record<string, unknown>;

const ImageButton = React.forwardRef<HTMLElement, Props>(
  (
    { title, src, fill, stroke, disabled, onClick, loading, ...props }: Props,
    ref,
  ) => (
    <TextButton
      // @ts-ignore
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      loaderProps={{
        height: 'auto',
        width: 'auto',
        'aria-label': `${title} loader`,
        ...props,
      }}
      buttonProps={{
        type: 'button',
        title,
        'aria-label': title,
        ...props,
      }}
    >
      {/* @ts-ignore */}
      <Icon src={src} fill={fill} stroke={stroke}></Icon>
    </TextButton>
  ),
);

export { ImageButton };
