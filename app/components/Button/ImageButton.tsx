import React from 'react';

import Icon from 'components/Icon';

import StyledTextButton from './StyledTextButton';

type Props = {
  title: string;
  src: string;
  fill?: string;
  stroke?: string;
  onClick: () => void;
  disabled: boolean;
} & Record<string, unknown>;

const ImageButton = React.forwardRef<HTMLElement, Props>(
  ({ title, src, fill, stroke, disabled, onClick, ...props }: Props, ref) => (
    <StyledTextButton
      ref={ref}
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {/* @ts-ignore */}
      <Icon src={src} fill={fill} stroke={stroke}></Icon>
    </StyledTextButton>
  ),
);

export { ImageButton };
