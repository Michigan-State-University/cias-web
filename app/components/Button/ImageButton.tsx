import React, { PropsWithChildren } from 'react';

import Icon from 'components/Icon';

import { HoverTextButton } from './styled';

export type ImageButtonProps = PropsWithChildren<{
  title: string;
  src: string;
  fill?: string;
  stroke?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  iconProps?: object;
  showHoverEffect?: boolean;
  isActive?: boolean;
  styles?: object;
  spinnerProps?: object;
  noHoverBackground?: boolean;
}> &
  Record<string, unknown>;

const ImageButton = React.forwardRef<HTMLElement, ImageButtonProps>(
  (
    {
      title,
      src,
      fill,
      stroke,
      disabled,
      onClick,
      loading,
      iconProps,
      showHoverEffect = false,
      isActive = false,
      styles = {},
      children,
      spinnerProps,
      noHoverBackground,
      ...props
    }: ImageButtonProps,
    ref,
  ) => (
    <HoverTextButton
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
      spinnerProps={spinnerProps}
      showHoverEffect={showHoverEffect}
      noHoverBackground={noHoverBackground}
      active={isActive}
      styles={styles}
    >
      {/* @ts-ignore */}
      <Icon src={src} fill={fill} stroke={stroke} {...iconProps}></Icon>
      {children}
    </HoverTextButton>
  ),
);

export { ImageButton };
